import { IContext } from "./lib";
import { errorInline, getInline, messageToString } from "./lib/utils";

export const search = {
  setup: function (bot: any): void {
    bot.on("inline_query", triggers.inline);
  },
};

const triggers = {
  inline: async function (ctx: IContext): Promise<void> {
    const query = messageToString(ctx.inlineQuery!.query);
    const limit: number = 20;
    const offset: number = parseInt(ctx.inlineQuery!.offset, 10) || 0;
    const results = await getInline(query!);

    if (query !== " " && results.length) {
      const answer = results.slice(offset, offset + limit);
      ctx.answerInlineQuery(answer, { next_offset: `${offset + limit}` });
    } else {
      ctx.answerInlineQuery(errorInline());
    }
  },
};
