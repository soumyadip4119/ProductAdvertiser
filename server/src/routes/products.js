import express from "express";
import mongoose from "mongoose";
import { ProductsModel } from "../models/Products.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await ProductsModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const product = new ProductsModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    specifications: req.body.specifications,
    summary: req.body.summary,
    imageUrl: req.body.imageUrl,
    phone: req.body.phone,
    userOwner: req.body.userOwner,
  });
  console.log(product);

  try {
    const result = await product.save();
    res.json({
      createdProduct: {
        name: result.name,
        image: result.image,
        specifications: result.specifications,
        summary: result.summary,
        _id: result._id,
      },
    });
  } catch (err) {
    res.json(err);
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const result = await ProductsModel.findById(req.params.productId);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  const product = await ProductsModel.findById(req.body.productId);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedProducts.push(product);
    await user.save();
    res.json({ savedProducts: user.savedProducts });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedProducts/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json({ savedProducts: user?.savedProducts });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get("/savedProducts/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedProducts = await ProductsModel.find({
      _id: { $in: user.savedProducts },
    });

    console.log(savedProducts);
    res.json({ savedProducts });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

export { router as productsRouter };