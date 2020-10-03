import { Telegraf } from "telegraf";
import { main } from "../commands/main";

export const setup = function (bot: any): void {
  bot.use(Telegraf.log());
  main.setup(bot);
};
