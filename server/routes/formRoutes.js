import express from "express";
import {
  saveStep,
  getForm,
  markCompleted,
} from "../controllers/formController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadImage } from "../controllers/uplaodImgController.js";

const router = express.Router();

router.post("/save-step", saveStep);
router.get("/:userId", getForm);
router.post("/upload", upload.single("image"), uploadImage);
router.put("/complete", markCompleted);

export default router;
