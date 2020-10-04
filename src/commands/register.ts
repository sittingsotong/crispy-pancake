import { IContext } from "./lib";
import { userCreate, userJoin } from "../models/user";
import { codeScene } from "./lib/scenes";
import {
  mainMenuKeyboard,
  shareCodeKeyboard,
  retryCodeKeyboard,
} from "./lib/keyboards";

export const register = {
  setup: function (bot: any): void {
    bot.action("create", triggers.create);
    bot.action("join", triggers.join);
    codeScene.on("text", triggers.code);
  },
};

const triggers = {
  create: async function (ctx: IContext): Promise<void> {
    const { code, success } = await userCreate(
      ctx.from!.id,
      ctx.from!.first_name
    );
    const message = success
      ? `You have created a group with code:\n\`${code}\`.`
      : `You already belong to a group.`;
    ctx.editMessageText(
      message,
      success ? shareCodeKeyboard(code!) : mainMenuKeyboard
    );
  },
  join: async function (ctx: IContext): Promise<void> {
    ctx.scene.enter("code");
    ctx.editMessageText(
      `Please enter the *code* of the group you are joining.`,
      { parse_mode: "Markdown" }
    );
  },
  code: async function (ctx: IContext): Promise<void> {
    const code = ctx.update.message!.text!.trim();
    const { message, success } = await userJoin(
      ctx.from!.id,
      ctx.from!.first_name,
      code
    );
    ctx.scene.leave("code");
    if (success) {
      ctx.reply(
        `You have successfully joined the group.\n\n` + message,
        mainMenuKeyboard
      );
    } else {
      ctx.reply(message, retryCodeKeyboard);
    }
  },
};
