// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { updateSheets } from "@/lib/update-sheets";
import { sendEmail } from "./email";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.["id"];

  const { data: inscritoData, error: inscritoError } = await supabase
    .from("inscritos_fernandinho")
    .select("*")
    .eq("id", id);

  console.log("dale2", { id, inscritoData });
  if (inscritoError || inscritoData.length !== 1) {
    throw new Error(inscritoError?.message ?? "Unknown error");
  }

  const inscrito = inscritoData[0];

  const { data: paymentData, error: paymentError } = await supabase
    .from("payments")
    .upsert({
      user_id: inscrito.id,
      price: inscrito.ticketTotalPrice,
      paid: true,
      link: "ADMIN",
      method: "Samuel",
      lote: inscrito.lote,
    })
    .eq("user_id", inscrito.id)
    .select("*");

  console.log("dale3", { id: inscrito.id, paymentData });
  if (paymentError || !paymentData || paymentData.length !== 1) {
    console.log("paymentError", { paymentError, paymentData });
    throw new Error(paymentError?.message ?? "Unknown error");
  }

  // if (inscrito.sent_email) {
    // res.status(200).json({ ...inscrito, already_sent: true });
    // return;
  // }  

  try {
    const email = await sendEmail({
      name: inscrito.name,
      cpf: inscrito.cpf,
      email: inscrito.email,
      price: inscrito.ticketTotalPrice,
      vip: inscrito.ticketInfo.vip,
      geral: inscrito.ticketInfo.geral,
      id: `${inscrito.id}`,
    });
    console.log("dale3", "success", email);
  } catch (err) {
    console.log("err3", err);
    res.status(500).json(err);
    return;
  }

  const { error: error2 } = await supabase
    .from("inscritos_fernandinho")
    .update({ sent_email: true })
    .eq("id", inscrito.id);

  if (error2) {
    console.log("error", error2);
    res.status(500).json(error2);
  } else {
    const ret = await updateSheets();
    console.log("dale4", { updateSheets: ret });
    res.status(200).json({ inscrito, updatedSheet: ret });
  }
}
