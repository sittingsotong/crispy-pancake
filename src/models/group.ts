import { prop, Typegoose } from "typegoose";
import crypto from "crypto";

class group extends Typegoose {
  @prop({ required: true, unique: true })
  id: string;
  @prop({ required: true, index: true })
  members: string[];
}

export const Group = new group().getModelForClass(group, {
  schemaOptions: { collection: "groups" },
});

export async function createGroup(founder: string) {
  const code = crypto.randomBytes(20).toString("hex");
  const existingGroup = await Group.findOne({ id: code });
  if (!existingGroup) await new Group({ id: code, members: [founder] }).save();
  return existingGroup ? createGroup(founder) : code;
}

export async function joinGroup(
  code: string,
  member: string
): Promise<{ message: string; success: Boolean }> {
  const existingGroup = await Group.findOne({ id: code });
  if (existingGroup) {
    existingGroup.members.push(member);
    await Group.updateOne({ id: code }, { members: existingGroup?.members });
    return {
      message: `Current members:\n\n${existingGroup.members.join(", ")}.`,
      success: true,
    };
  }
  return {
    message: `You have not entered a valid code. Please try again or head back to the main menu.`,
    success: false,
  };
}

export async function clearGroups() {
  await Group.deleteMany({});
}
