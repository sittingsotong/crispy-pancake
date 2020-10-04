import { prop, Typegoose } from "typegoose";
import { IContext } from "../commands/lib";
import { createGroup, joinGroup, clearGroups } from "./group";

class user extends Typegoose {
  @prop({ required: true, unique: true })
  user_id: number;
  @prop({ required: true, index: true })
  first_name: string;
  @prop({ required: true, index: true })
  group_code: string;
}

export const User = new user().getModelForClass(user, {
  schemaOptions: { collection: "users" },
});

export async function exists(ctx: IContext): Promise<boolean> {
  const existingUser = await User.findOne({
    user_id: ctx.from?.id,
    first_name: ctx.from?.first_name,
  });
  return existingUser ? true : false;
}

export async function userCreate(
  id: number,
  name: string
): Promise<{ code: null | string; success: boolean }> {
  const existingUser = await User.findOne({ user_id: id, first_name: name });
  if (existingUser) {
    return { code: null, success: false };
  } else {
    const code = await createGroup(name);
    await new User({
      user_id: id,
      first_name: name,
      group_code: code,
    }).save();
    return { code: code, success: true };
  }
}

export async function userJoin(id: number, name: string, code: string) {
  const existingUser = await User.findOne({ user_id: id, first_name: name });
  if (existingUser) {
    return { message: `You already belong to a group.`, success: false };
  } else {
    const res = await joinGroup(code, name);
    if (res.success)
      await new User({
        user_id: id,
        first_name: name,
        group_code: code,
      }).save();
    return res;
  }
}

export async function clearUsers() {
  await User.deleteMany({});
  await clearGroups();
}
