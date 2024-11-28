import database from "@/db";
import Product from "@/models/productModel";

export default async function handler(req, res) {
  await database();
  const { category } = req.query;
  if (req.method === "GET") {
    const result = await Product.find({ category });
    return res.status(200).json(result);
  } else {
    return res.status(400).send("Unknown request");
  }
}
