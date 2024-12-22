import { hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  // insert data into database
  try {
    const client = await connectDB();
    const db = client.db();
    const existingUser = await db.collection("user").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);
    const result = await db.collection("user").insertOne({
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    console.error(error); // Logs actual server-side error
    res.status(500).json({ message: "Something went wrong on the server." });
  }
}
