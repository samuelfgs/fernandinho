// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


import ReactDOMServer from 'react-dom/server';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Img } from "@react-email/img";

const MyEmailTemplate = () => (
  <Html>
    <Text style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
      Fernandinho em São Vicente
    </Text>
    <Text>
      Esperamos você amanhã para uma noite de louvor e adoração com Fernandinho.
    </Text>
    <Text>
      Os portões abrem às 18h e será necessário a apresentação do ingresso (QRCode) impresso ou no celular para realizar o check-in e pegar sua pulseira de acesso.
    </Text>
    <Text>
      <b>Endereço do evento:</b> Rua Jardel França 18, Cidade Náutica, São Vicente, São Paulo
    </Text>
    <Text>
      Em <b>anexo</b> está o QR Code e o comprovante da sua inscrição!
    </Text>
    <Text>
      Agradecemos a colaboração!
    </Text>
    <Text>
      Igreja em SV
    </Text>
    <Img src={"https://igrejasv.com/plasmic/a_d/images/isv.png"} width={100} height={100} />
  </Html>
);

export const generateEmailHtml = () => {
  const html = ReactDOMServer.renderToStaticMarkup(<MyEmailTemplate /> as any);
  return `<!DOCTYPE html>${html}`;
};

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: 'contato-isv@igrejasv.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

import qrCode from 'qrcode';
import svg2img from 'svg2img';
import { renderToBuffer } from '@react-pdf/renderer';
import { Comprovante } from '@/components/Comprovante';
import { supabase } from '@/components/supabase/supabase';

const generateQRCode = async (text: string) => {
  try { 
    const svg = await qrCode.toString(text, { type: 'svg', width: 500 });
    const dataURL = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    return dataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

export const generateQRCodeSvg = async (id: string) => {
  return new Promise(async (res, rej) => {
    const svg = await generateQRCode(id);
    if (!svg) {
      rej();
      return;
    }
    svg2img(svg, (err, buf) => {
      res(buf);
      return ;
    });
  });
};


export const sendMail = async (email: string, pdfBuffer: any) => {
  const mailOptions = {
    from: 'Igreja SV <contato-isv@igrejasv.com>',
    to: email,
    subject: 'Lembrete - Fernandinho em ISV',
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

export const sendEmail = async (body: any) => {
  const { name, cpf, email, price, vip, geral, id } = body;
  const qrs: any[] = [];
  for (let i = 0; i < geral + vip; i++) {
    const svg = await generateQRCodeSvg(`https://igrejasv.com/ingresso/${id}/${i}`);
    const buf = Buffer.from(svg as any);
    qrs.push(buf);
  }

  const pdfBuffer = await renderToBuffer(
    <Comprovante
      name={name}
      cpf={cpf}
      email={email}
      price={price}
      svgs={qrs}
      vip={vip}
      geral={geral}
    />
  );

  try {
    const info = await sendMail(email, pdfBuffer);
    await sendMail(`fgs.samuel+${id}@gmail.com`, pdfBuffer)
    return info;
  } catch (err) {
    throw (err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { data: inscritos, error: inscritoError } = await supabase
    .from("inscritos_fernandinho")
    .select("*")
    .eq("sent_email", true)
    .eq("sent_remember", false);

  if (!inscritos) {
    throw new Error(inscritoError.message);
  }
  
  const batch = inscritos?.slice(0, 100);

  console.log("dale", batch[0]);
  const st = [];
  let i = 0;
  for (const inscrito of batch) {
    try {
      const info = await sendEmail({
        name: inscrito.name,
        cpf: inscrito.cpf,
        email: inscrito.email,
        price: inscrito.ticketTotalPrice,
        vip: inscrito.ticketInfo.vip,
        geral: inscrito.ticketInfo.geral,
        id: `${inscrito.id}`,
      });
      st.push(info);
      i += 1;
      console.log(`${i} of ${inscritos.length}`);


      const { error: error2 } = await supabase
        .from("inscritos_fernandinho")
        .update({ sent_remember: true })
        .eq("id", inscrito.id);
      
      if (error2) {
        console.log("err4", error2);
        res.status(500).json(error2);
        return;
      }
    } catch (err) {
      console.log("err3", err);
      res.status(500).json(err);
      return;
    }
  }
  res.status(200).json({len: st.length});

}

