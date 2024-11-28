import { models } from "mongoose";
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
