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

const colOrder = [
  "id",
  "fullName",
  "cpf",
  "telefone",
  "email",
  "lote",
  "vip",
  "geral",
  "total",
  "status",
] as const;

type Row = { [K in (typeof colOrder)[number]]: string };

export async function updateSheets() {
  const { data: inscritos, error: err1 } = await supabase
    .from("inscritos_fernandinho")
    .select(
      `
        *,
        payments (id, paid, lote)
      `
    )
    .filter("id", "gte", 43)
    .limit(5000)

  console.log("dale", inscritos?.length, err1);
  const lines: Row[] = [];

  if (!inscritos || err1) {
    return false;
  }

  const not_paid = [];
  const already_seen = new Set();
  for (const inscricao of inscritos) {
    const newLine = {
      id: inscricao.id,
      fullName: inscricao.name,
      cpf: inscricao.cpf,
      telefone: inscricao.telefone,
      email: inscricao.email,
      lote: inscricao.ticketInfo.lote,
      vip: inscricao.ticketInfo.vip,
      geral: inscricao.ticketInfo.geral,
      total: inscricao.ticketTotalPrice,
      status: inscricao.payments?.[0]?.paid ? "PAGO" : "AGUARDANDO",
    }

    if (!inscricao.payments?.find((p: any) => p.paid)) {
      not_paid.push(newLine);
    } else {
      lines.push(newLine);
      already_seen.add(newLine.email);
      already_seen.add(newLine.telefone);
      already_seen.add(newLine.fullName);
    }
  }

  const not_paid_lines = [];
  for (const line of not_paid) {
    if (already_seen.has(line.email)) continue;
    if (already_seen.has(line.telefone)) continue;
    if (already_seen.has(line.fullName)) continue;

    already_seen.add(line.email);
    already_seen.add(line.telefone);
    already_seen.add(line.fullName);
    not_paid_lines.push(line);
  }

  const sheets = google.sheets({ version: "v4", auth });

  const formattedLines = [];
  for (const line of lines) {
    const row = [];
    for (const col of colOrder) {
      row.push(line[col as keyof Row]);
    }
    formattedLines.push(row);
  }
  for (let i = 0; i < 100; i++) formattedLines.push(colOrder.map((x) => ""));

  const formattedLinesNotPaid = [];
  for (const line of not_paid_lines) {
    const row = [];
    for (const col of colOrder) {
      row.push(line[col as keyof Row]);
    }
    formattedLinesNotPaid.push(row);
  }
  for (let i = 0; i < 100; i++) formattedLinesNotPaid.push(colOrder.map((x) => ""));

  const range = "A2:Z";
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      range,
      values: formattedLines,
    },
  });

  const range2 = "Inscritos!A2:Z";
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: range2,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      range: range2,
      values: formattedLinesNotPaid,
    },
  });

  return formattedLines;
}
