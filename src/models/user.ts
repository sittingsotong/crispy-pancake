import { prop, Typegoose } from "typegoose";

export class userSchema extends Typegoose {
  @prop({ required: true, unique: true })
  user_id: number;
  @prop({ required: true, index: true })
  first_name: string;
}

export const User = new userSchema().getModelForClass(userSchema, {
  schemaOptions: { timestamps: true, capped: 1000 * 1024 },
});

export async function saveUser(id: number, name: string) {
  const existingUser = User.findOne({ user_id: id }, { first_name: name });
  if (existingUser) {
    return `${name} already exists.`;
  } else {
    const user = new User({
      user_id: id,
      first_name: name,
    });
    user.save();
    return `${user} has been added.`;
  }
}
