import { Telegraf, session } from "telegraf";
import { stage } from "../commands/lib/scenes";
import * as command from "../commands/index";

export const setup = function (bot: any): void {
  bot.use(Telegraf.log());
  bot.use(session());
  bot.use(stage.middleware());
  command.mainpage.setup(bot);
  command.register.setup(bot);
  command.find.setup(bot);
  command.search.setup(bot);
  bot.launch();
};
