import { connectDB } from "@/lib/db";
import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectDB();

  try {
    const usersCollection = client.db().collection("user");

    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const passwordsAreEqual = await verifyPassword(oldPassword, user.password);
    if (!passwordsAreEqual) {
      res.status(403).json({ message: "Invalid password" });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ message: "Password updated!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  } finally {
    client.close();
  }
}
