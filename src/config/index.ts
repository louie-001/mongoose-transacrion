import { load } from "ts-dotenv"

const envTypes = {
  DB_HOST: String,
  DB_PORT: Number,
  DB_COLLECTION: String,
  SERVICE_PORT: Number
}

const env = load(envTypes)

class Config {
  static dbConfig = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    collection: env.DB_COLLECTION
  }
  static serviceConfig = {
    port: env.SERVICE_PORT
  }
}

export default Config
