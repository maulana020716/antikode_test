import express from "express";
import MasterController from "../controllers/master.controller.js";
const router = express.Router();

router.route("/pt").get(MasterController.getPt);
router.route("/pt/:id").get(MasterController.getPtById);
router.route("/pt").post(MasterController.postPT);
router.route("/coa").get(MasterController.getCoa);

export default router;
