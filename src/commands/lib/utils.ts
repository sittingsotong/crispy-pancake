import { remove } from "remove-accents";
import { telegramInline } from "telegraf";
import { Markup } from "telegraf";
import { Recipe } from "../../models/recipe";

export const messageToString = (message: string): string | undefined => {
  return message !== undefined && typeof message === "string"
    ? Buffer.from(remove(message), "ascii")
        .toString("ascii")
        .replace(/(?:=\(|:0|:o|: o|: 0)/, ": o")
    : undefined;
};

export async function getInline(value: string) {
  const recipes = await Recipe.find({
    $or: [
      {
        title: { $regex: value, $options: "i" },
      },
      { ingredients: { $regex: value, $options: "i" } },
    ],
  });
  let results: telegramInline[] = [];
  recipes.forEach((x) => {
    results.push({
      id: x._id,
      title: x.title,
      type: "article",
      input_message_content: {
        message_text: `*${x.title}*\n\n${x.link}`,
        parse_mode: "Markdown",
      },
      reply_markup: Markup.inlineKeyboard([
        Markup.callbackButton("Show Ingredients", "link"),
      ]),
      description: `Time: ${x["total time"]}\nPeople: ${x.yields}`,
      thumb_url: x.image,
    });
  });
  return results;
}

export function errorInline() {
  return [
    {
      id: "0",
      title: `No Results`,
      type: "article",
      input_message_content: {
        message_text: `Sorry, there are no results for your search.`,
        parse_mode: "Markdown",
      },
      reply_markup: Markup.inlineKeyboard([]),
      description: `Please try searching ingredients or food titles.`,
      thumb_url:
        "https://raw.githubusercontent.com/sittingsotong/crispy-pancake/master/src/assets/error.jpg",
    },
  ];
}
