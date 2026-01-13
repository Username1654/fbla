import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
let PORT = 3000;
const password = process.env.MONGO_PASSWORD;
const user = process.env.MONGO_USER;
const uri = `mongodb+srv://${user}:${password}@cluster0.nu7olwn.mongodb.net/FBLA`;
const client = new MongoClient(uri);
const app = express();
app.use(express.json());
app.use(
  cors({
      origin: "http://localhost:5174",
      credentials:true,
    })
);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  await client.connect();
  const db = client.db("FBLA");
  const use = db.collection("users");

  // Read existing users
  let users = [];
  if (fs.existsSync("../../../client/src/Users.json")) {
    users = JSON.parse(fs.readFileSync("../../../client/src/Users.json", "utf8"));
  }
  const userExists = users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
  const user = await use.findOne({ username });
  if (userExists && user.password === password) {
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } else if (userExists) {
    console.log("User already exists:", username);
    return res.status(409).json({
      success: false,
      message: "Username already exists",
    });
  }

  // Add new user
  users.push({ username, password });
  use.insertOne({ username, password });

  // Save back to JSON
  fs.writeFileSync("../../../client/src/Users.json", JSON.stringify(users, null, 2));
  res.json({ success: true ,
      message: "Username already exists",});
});



mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));



app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
