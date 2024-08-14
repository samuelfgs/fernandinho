// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "../email";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body?.data?.id;
  const mercadoPago = await (
    await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
  ).json();

  if (mercadoPago.status !== "approved") {
    console.log("dale", "not paid");
    res.status(500).json("not paid");
    return;
  }

  const { data: inscritoData, error: inscritoError } = await supabase
    .from('inscritos_fernandinho')
    .select("*")
    .eq("mercadopago", id);

  if (inscritoError || inscritoData.length !== 1) {
    throw new Error(inscritoError?.message ?? "Unknown error");
  }

  const inscrito = inscritoData[0];

  const { data: paymentData, error: paymentError } = await supabase
    .from('payments')
    .upsert({ 
      user_id: inscrito.id,
      price: inscrito.ticketTotalPrice,
      paid: true,
      link: mercadoPago.init_point,
      method: mercadoPago.payment_method_id,
      lote: inscrito.lote,
     })
    .eq('id', +mercadoPago.external_reference)
    .select("*");

  if (paymentError || !paymentData || paymentData.length !== 1) {
    console.log("paymentError", { paymentError, paymentData })
    throw new Error(paymentError?.message ?? "Unknown error");
  }

  if (inscrito.sent_email) {
    res.status(200).json({...inscrito, already_sent: true});
    return;
  }

  try {
    const email = await sendEmail({
      name: inscrito.name,
      cpf: inscrito.cpf,
      email: inscrito.email,
      kids: paymentData[0].kids,
      adultos: paymentData[0].adults,
      price: paymentData[0].price,
      id: `${inscrito.id}`,
      ticketType: inscrito.ticket_type
    });
    console.log("dale3", "success", email)
  } catch (err) {
    console.log("err3", err)
    res.status(500).json(err);
    return;
  }

  const { error: error2 } = await supabase
    .from('inscritos')
    .update({ sent_email: true })
    .eq('id', inscrito.id)

  if (error2) {
    console.log("error", error2);
    res.status(500).json(error2);
  } else {
    res.status(200).json(inscrito);
  }

}
