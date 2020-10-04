import mongoose from "mongoose";
import ev from "../ev.config";

export const connection = function (): void {
  mongoose.connect(ev.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
