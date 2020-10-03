import { Telegraf } from "telegraf";
import ev from "../ev.config";

export const bot = new Telegraf(ev.botToken);
