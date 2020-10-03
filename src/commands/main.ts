import { Markup } from "telegraf";

export const main = {
  setup: function (bot: any): void {
    bot.command("/start", triggers.start);
  },
};

const triggers = {
  start: function (ctx: any): void {
    ctx.reply(
      `Hello ${ctx.from?.first_name}. What would you like to do?`,
      Markup.inlineKeyboard([
        [Markup.callbackButton("Update Schedule", "schedule")],
      ]).extra()
    );
  },
};
