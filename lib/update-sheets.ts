import { JWT } from "google-auth-library";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const spreadsheetId = process.env.SPREADSHEET_ID;
const auth = new JWT({
  keyFile: "./google-sheets.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

type Row = {
  fullName: string;
  cpf: string;
  telefone: string;
  email: string;
  lote: number;
  vip: number;
  geral: number;
  total: number;
  status: "PAGO" | "AGUARDANDO";
};

export async function updateSheets() {
  const { data: inscritos, error: err1 } = await supabase.from(
    "inscritos_fernandinho"
  ).select(`
      *,
      payments (id, paid, lote)
    `);

  const lines: Row[] = [];

  if (!inscritos || err1) {
    return false;
  }
  for (const inscricao of inscritos) {
    lines.push({
      fullName: inscricao.name,
      cpf: inscricao.cpf,
      telefone: inscricao.telefone,
      email: inscricao.email,
      lote: inscricao.ticketInfo.lote,
      vip: inscricao.ticketInfo.vip,
      geral: inscricao.ticketInfo.geral,
      total: inscricao.ticketTotalPrice,
      status: inscricao.payments.paid ? "PAGO" : "AGUARDANDO",
    });
  }

  const colOrder = [
    "fullName",
    "cpf",
    "telefone",
    "email",
    "lote",
    "vip",
    "geral",
    "total",
    "status",
  ];
  const sheets = google.sheets({ version: "v4", auth });

  const range = `Inscritos!A2:Z`;

  const formattedLines = [];
  for (const line of lines) {
    const row = [];
    for (const col of colOrder) {
      row.push(line[col as keyof Row]);
    }
    formattedLines.push(row);
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      range,
      values: formattedLines,
    },
  });

  return true;
}
