import * as dotenv from "dotenv";

dotenv.config();

export default {
  botToken: process.env.BOT_TOKEN!,
  uri: process.env.ATLAS_URI!,
  admin: process.env.ADMIN_ID!.split(" ").map((x) => Number(x)),
};
