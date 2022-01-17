import express from "express";
import BrandController from "../controllers/brand.controller.js";
const router = express.Router();

router.route("/").get(BrandController.getBrands);
router.route("/:id").get(BrandController.getBrandById);
router.route("/create").post(BrandController.createBrand);
router.route("/update/:id").put(BrandController.updateBrand);
router.route("/delete/:id").delete(BrandController.deleteBrand);

export default router;
