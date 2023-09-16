import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { productsRouter } from "./routes/products.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/products", productsRouter);

mongoose.connect(
  "mongodb+srv://soumyadipdas58:rwdx0M9hwUSR7uSr@productadv.nh8s4nk.mongodb.net/productadv?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log("Server started"));
