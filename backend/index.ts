import express from "express";
import db from "./utils/db";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (_req, res) => {
  const users = await db.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
