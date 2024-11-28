import database from "@/db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await database();
  const { email } = req.query;

  if (req.method === "GET") {
    const result = await User.findOne({ email });
    if (!result) return res.status(404).json({ message: "User not found" });
    const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET);
    return res.status(200).json({ token: token });
    // return res.status(200).json(result);
  } else if (req.method === "DELETE") {
    const result = await User.findOneAndDelete({ email });
    return res.status(200).json(result);
  } else {
    return res.status(400).json({ message: "Invalid request method" });
  }
}
