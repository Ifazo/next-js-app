import database from "@/db";
import User from "@/models/userModel";

export default async function handler(req, res) {
  await database();
  const data = req.body;

  if (req.method === "GET") {
    const users = await User.find({});
    return res.send(users);
  } else if (req.method === "POST") {
    try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        return res.status(400).send("User already exists");
      } else {
        const result = await User.create(data);
        return res.send(result);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).send("Error creating user");
    }
  } else {
    return res.status(400).send("Unknown request");
  }
}
