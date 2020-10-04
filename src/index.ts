import { bot } from "./helpers/bot";
import { connection } from "./helpers/connection";
import { setup } from "./helpers/setup";

connection();

setup(bot);
