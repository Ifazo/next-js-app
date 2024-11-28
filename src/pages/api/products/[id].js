import database from "@/db";
import Product from "@/models/productModel";

export default async function handler(req, res) {
  await database();
  const { id } = req.query;
  const data = req.body;
  if (req.method === "GET") {
    const result = await Product.findById(id);
    res.status(200).json(result);
  } else if (req.method === "DELETE") {
    const result = await Product.findByIdAndDelete(id);
    res.status(200).json(result);
  } else if (req.method === "PATCH") {
    const result = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(result);
  } else {
    res.status(400).send("Unknown request");
  }
}
