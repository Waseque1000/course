import dotenv from "dotenv";
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 5001,
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "sWyq7UGmNdnOFg0JQz9LNTXnsPBUWeVh",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:5001",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",

  // SSLCommerz
  SSLCommerz_STORE_ID: process.env.SSLCommerz_STORE_ID || "aura_lms_sandbox",
  SSLCommerz_STORE_PASSWORD: process.env.SSLCommerz_STORE_PASSWORD || "aura_lms_sandbox@ssl",
  SSLCommerz_IS_LIVE: process.env.SSLCommerz_IS_LIVE === "true",

  // Mux & Bunny
  MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
  MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET,
  BUNNY_STREAM_LIBRARY_ID: process.env.BUNNY_STREAM_LIBRARY_ID,
  BUNNY_STREAM_API_KEY: process.env.BUNNY_STREAM_API_KEY,

  // SMTP
  SMTP_HOST: process.env.SMTP_HOST || "smtp.mailtrap.io",
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 2525,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM || "no-reply@bloggent.com",
};

