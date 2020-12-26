import * as dotenv from "dotenv";

dotenv.config();
/* switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path }); */

export const PORT = process.env.PORT || '3000';
export const DB_CNN = process.env.DB_CNN || '';
export const SECRED_JWT_SEED = process.env.SECRED_JWT_SEED || '';
