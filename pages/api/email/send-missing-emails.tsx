// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { renderToBuffer } from '@react-pdf/renderer';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
import { Comprovante } from '@/components/Comprovante';

import nodemailer from 'nodemailer';
import { validate } from "email-validator";
import { generateEmailHtml, generateQRCodeSvg } from '../email';

export const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: 'contato@igrejasv.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendMail = async (email: string, pdfBuffer: any) => {
  const mailOptions = {
    from: 'Igreja SV <contato@igrejasv.com>',
    to: email,
    subject: 'Inscrição Realizada com Sucesso - Fernandinho em ISV',
    html: generateEmailHtml(),
    attachments: [
      {
        filename: 'comprovante.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ]
  };

  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("dale2", error, info)
        rej(error);
      } else {
        console.log("dale", info);
        res(info);
      }
    });
  })
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const checkApproval = async (paymentId: string) => {
  const mercadoPago = await (await fetch(`https://api.mercadopago.com/v1/payments/search?external_reference=${paymentId}`, {
      headers: {
        authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    })).json();
    if (mercadoPago.paging.total < 1) return false;
    const result = mercadoPago.results.find((r:any) => r.status === "approved");
    return !!result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { data, error } = await supabase
  //   .from("inscritos")
  //   .select("*")
  // if (error) {
  //   res.status(500).json({err2: error});
  //   return;
  // }
  // const { data : payments, error: paymentError } = await supabase
  //   .from("payments")
  //   .select("*");
  // if (paymentError) {
  //   res.status(500).json({err3: error});
  //   return;
  // }
  // const owners = data.filter((x: any) => x.owner_id == null && x.sent_email === false);
  // const all: any[] = [];
  // for (const row of owners) {
  //   if (!validate(row.email)) {
  //     continue;
  //   }
  //   // if (row.id !== 76246025) continue;
  //   const payment = payments.find(pay => pay.user_id === row.id);
  //   const group = data.filter((x: any) => +x.owner_id === row.id || x.id === row.id);
  //   if (!payment) {
  //     res.status(500).json({err5: row});
  //     return;
  //   }
  //   if (payment.paid == false) {
  //     const status = await checkApproval(payment.id);
  //     if (!status) {
  //       continue;
  //     }
  //     const { error: error7 } = await supabase
  //       .from('inscritos')
  //       .update({ paid: true })
  //       .eq('id', payment.id);
  //     if (error7) {
  //       res.status(500).json({error7});
  //       continue;
  //     }
  //   }
  //   const svgs = [];
  //   for (const person of group) {
  //     const svg = await generateQRCodeSvg(`https://igrejasv.com/ingresso/${person.id}`);
  //     const buf = Buffer.from(svg as any);
  //     svgs.push(buf);
  //   }
  //   const pdfBuffer = await renderToBuffer(
  //     <h1>Hello</h1>
  //   );

  //   try {
  //     await sendMail(`fgs.samuel+${row.id}@gmail.com`, pdfBuffer);
  //     await sendMail(row.email, pdfBuffer);
  //     for (const p of group) {
  //       const { error: error2 } = await supabase
  //       .from('inscritos')
  //       .update({ sent_email: true })
  //       .eq('id', p.id)

  //       if (error2) {
  //         res.status(500).json({err4: error2});
  //         return;
  //       }
  //     }
  //   } catch(err) {
  //     res.status(500).json({err1: err, email: row.email});
  //     return;
  //   }
  //   all.push(group);
  //   if (all.length === 10) {
  //     break;
  //   }
  //   await sleep(2000);
  // }
  // res.status(200).json(all);
}