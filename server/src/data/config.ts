import dotenv from "dotenv";
dotenv.config();

export const PORT: number = Number(process.env.PORT) || 4000;

export const DB_NAME: string = process.env.DB_NAME || "database";

export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_PASS: string | undefined = process.env.DB_PASS;
export const DB_PORT: number | undefined = Number(process.env.DB_PORT);
export const DB_HOST: string | undefined = process.env.DB_HOST;

export const REDIS_URI: string = String(process.env.REDIS_URI);

export const ACCESS_TOKEN_SECRET_KEY: string = process.env.ACCESS_TOKEN_SECRET_KEY || "access_secret_key";
export const REFRESH_TOKEN_SECRET_KEY: string = process.env.REFRESH_TOKEN_SECRET_KEY || "refresh_secret_key";
export const ACCESS_TOKEN_EXPIRE_MINUTES: number = Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) || 5;
export const REFRESH_TOKEN_EXPIRE_MINUTES: number = Number(process.env.REFRESH_TOKEN_EXPIRE_MINUTES) || 60;

export const LOGGING: boolean = process.env.LOGGING === "true";
