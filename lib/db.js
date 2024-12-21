import { MongoClient } from "mongodb";

export async function connectDB() {
  try {
    console.log(process.env.MONGODB_URI);
    const client = await MongoClient.connect(
      "mongodb://127.0.0.1:27017/usersData"
    );
    console.log("Database connected!");
    return client;
  } catch (error) {
    console.error(error);
  }
}
