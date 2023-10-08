import express, { response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to my website" });
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`);
    });
    console.log("App connected to mongodb");
  })
  .catch((error) => console.log(error));
