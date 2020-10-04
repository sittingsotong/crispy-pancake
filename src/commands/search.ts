import { Markup, Context } from "telegraf";

export const search = {
  setup: function (bot: any): void {
    bot.on("inline_query", triggers.inline);
  },
};

const triggers = {
  inline: async function (ctx: Context): Promise<void> {
    ctx.reply(
      `Hello ${ctx.from?.first_name}. What would you like to do?`,
      Markup.inlineKeyboard([
        [Markup.callbackButton("Update Schedule", "schedule")],
      ]).extra()
    );
  },
};
