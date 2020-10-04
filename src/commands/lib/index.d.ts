import { Interface } from "readline";
import { Context, Extra } from "telegraf";

interface Scene {
  readonly state: Object;
  readonly enter: (sceneId: string, defaultState?, silent?: boolean) => Scene;
  readonly reenter: (...args) => Scene;
  readonly leave: (...args) => Scene;
}

export interface IContext extends Context {
  readonly scene: Scene;
}

declare module "telegraf" {
  export type telegramInline = {
    id: string;
    title: string;
    type: string;
    input_message_content: {
      message_text: string;
      parse_mode: string;
    };
    reply_markup?: any;
    description: string;
    thumb_url: string;
  };
}
