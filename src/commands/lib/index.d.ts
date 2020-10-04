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
