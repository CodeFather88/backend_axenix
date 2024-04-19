import dotenv from 'dotenv';
dotenv.config()

export const DB_NAME_MONGO_DB = process.env.DB_NAME_MONGO_DB_INHOME || ""
export const URL_MONGO_DB=process.env.URL_MONGO_DB || ""
export const SECRET_KEY_ACCESS = process.env.SECRET_KEY_ACCESS || "123 "