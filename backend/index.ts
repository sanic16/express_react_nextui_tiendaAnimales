import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
