import database from "@/db";
import Product from "@/models/productModel";

export default async function handler(req, res) {
  await database();
  const data = req.body;
  if (req.method === "POST") {
    const result = await Product.create(data);
    res.send(result);
  } else if (req.method === "GET") {
    const result = await Product.aggregate([{ $sample: { size: 6 } }]);
    res.status(200).json(result);
  } else {
    res.status(400).send("Unknown request");
  }
}
