import * as dotenv from "dotenv";

dotenv.config();

export default {
  botToken: process.env.BOT_TOKEN ?? "",
  uri: process.env.ATLAS_URI ?? "",
};
