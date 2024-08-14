import { MercadoPagoConfig } from "mercadopago";

export const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN!,
  options: { timeout: 5000, idempotencyKey: "abc" },
});
