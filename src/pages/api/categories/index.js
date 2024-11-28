import database from "@/db";
import Category from "@/models/categoryModel";

export default async function handler(req, res) {
  await database();
  if (req.method === "GET") {
    const result = await Category.find();
    return res.status(200).json(result);
  }
}
