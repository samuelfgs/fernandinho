// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@/components/supabase/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const { data: inscritoData, error: inscritoError } = await supabase
    .from("inscritos_fernandinho")
    .select("*")
    .order("id", { ascending: false })

  res.status(200).json(inscritoData);
}
