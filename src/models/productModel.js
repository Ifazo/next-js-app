import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  features: Array,
  date: { type: Date, default: Date.now },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
