import { prop, Typegoose } from "typegoose";

export class recipe extends Typegoose {
  @prop({ required: true, index: true })
  title: string;
  @prop({ required: true })
  "total time": number;
  @prop({ required: true })
  yields: string;
  @prop({ required: true })
  ingredients: string[];
  @prop({ required: true })
  instructions: string;
  @prop({ required: true })
  image: string;
  @prop({ required: true })
  link: string;
}

export const Recipe = new recipe().getModelForClass(recipe, {
  schemaOptions: { collection: "recipes" },
});
