import { IContext } from "./lib";
import { Recipe } from "../models/recipe";

export const find = {
  setup: function (bot: any): void {
    bot.action("find", triggers.find);
  },
};

const triggers = {
  find: async function (ctx: IContext): Promise<void> {
    const recipes = await Recipe.find({ totalTime: 60 });
    ctx.reply(`${recipes.map((x) => x["total time"])}`);
  },
};
