import type { NextApiRequest, NextApiResponse } from "next";

import { Preference } from "mercadopago";
import { client } from "@/components/mercadopago";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, items, id } = JSON.parse(req.body);
  const preference = new Preference(client);

  const body = {
    items,
    payer: {
      name,
      email,
    },
    external_reference: id,
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_ENDPOINT!}/success`,
    },
    auto_return: "approved",
    notification_url: `${process.env
      .NEXT_PUBLIC_ENDPOINT!}/api/mercadopago/webhook/`,
  };

  console.log(body);

  try {
    const response = await preference.create({ body });
    res.json({ response });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
