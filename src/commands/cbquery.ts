import { Context } from "telegraf";

export const main = {
  setup: function (bot: any): void {
    bot.on("callback_query", triggers.cbquery);
  },
};

const triggers = {
  cbquery: function (ctx: Context): void {
    ctx.answerCbQuery(`Not implemented yet`, true);
  },
};
