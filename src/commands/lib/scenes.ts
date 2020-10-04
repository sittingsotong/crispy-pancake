import { Stage } from "telegraf";
import Scene from "telegraf/scenes/base";

// Amount of seconds before the user is kicked out of current session
const sessionLimit = 600;

export const stage = new Stage([], { ttl: sessionLimit });

export const codeScene = new Scene("code");
stage.register(codeScene);
