import { Markup, Extra } from "telegraf";
import { InlineKeyboardMarkup } from "telegram-typings";
import { ExtraEditMessage } from "telegraf/typings/telegram-types";

function keyboard(board: InlineKeyboardMarkup): ExtraEditMessage {
  return Extra.markdown().markup(board);
}

const mainButton = Markup.callbackButton("🏠 Back to main...", "mainScreen");

export const welcomeKeyboard = keyboard(
  Markup.inlineKeyboard([
    [Markup.callbackButton("Update Schedule", "update")],
    [Markup.callbackButton("Find Recipes", "find")],
  ])
);

export const registerKeyboard = keyboard(
  Markup.inlineKeyboard([
    [
      Markup.callbackButton("Create", "create"),
      Markup.callbackButton("Join", "join"),
    ],
  ])
);

export function shareCodeKeyboard(code: string) {
  return keyboard(
    Markup.inlineKeyboard([
      Markup.urlButton("Share code", `https://t.me/share/url?url=${code}`),
      mainButton,
    ])
  );
}

export const mainMenuKeyboard = keyboard(Markup.inlineKeyboard([[mainButton]]));

export const retryCodeKeyboard = keyboard(
  Markup.inlineKeyboard([[Markup.callbackButton("Retry", "join"), mainButton]])
);
