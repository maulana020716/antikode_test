import express from "express";
import ProductController from "../controllers/product.controller.js";
const router = express.Router();

router.route("/").get(ProductController.getProducts);
router.route("/:id").get(ProductController.getProductById);
router.route("/create").post(ProductController.createProduct);
router.route("/update/:id").put(ProductController.updateProduct);
router.route("/delete/:id").delete(ProductController.deleteProduct);

export default router;
