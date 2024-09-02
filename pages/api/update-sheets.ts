// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateSheets } from "@/lib/update-sheets";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ret = await updateSheets();

  if (ret) {
    res.status(200).json({ret});
  } else {
    res.status(500).json({ret});
  }
}
