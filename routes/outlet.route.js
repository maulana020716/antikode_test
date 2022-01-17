import express from "express";
import OutletController from "../controllers/outlet.controller.js";
const router = express.Router();

router.route("/").get(OutletController.getOutlets);
router.route("/:id").get(OutletController.getOutletById);
router.route("/create").post(OutletController.createOutlet);
router.route("/update/:id").put(OutletController.updateOutlet);
router.route("/delete/:id").delete(OutletController.deleteOutlet);

export default router;
