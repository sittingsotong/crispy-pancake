import { Markup } from "telegraf";
import { IContext } from "./lib";
import { clearUsers, exists } from "../models/user";
import { registerKeyboard } from "./lib/keyboards";
import ev from "../ev.config";

export const mainpage = {
  setup: function (bot: any): void {
    bot.start(triggers.start);
    bot.action("mainScreen", triggers.start);
    bot.command("clear", triggers.clear);
  },
};

const triggers = {
  start: async function (ctx: IContext): Promise<void> {
    if (await exists(ctx)) {
      ctx.reply(
        `Welcome back *${ctx.from?.first_name}*. What would you like to do?`,
        Markup.inlineKeyboard([
          [Markup.callbackButton("Update Schedule", "update")],
          [Markup.callbackButton("Find Recipes", "find")],
        ]).extra()
      );
    } else {
      ctx.reply(
        `Hi *${ctx.from?.first_name}*. Would you like to _create_ or _join_ a group?`,
        registerKeyboard
      );
    }
  },
  clear: async function (ctx: IContext): Promise<void> {
    if (ev.admin.includes(ctx.from!.id)) {
      await clearUsers();
      ctx.reply("All users and groups have been deleted from the database.");
    }
  },
};
