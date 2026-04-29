import express from "express";
import {
  registerUser,
  loginUser,
  isLoggedIn,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { googleAuth } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.get("/isLoggedIn", authMiddleware, isLoggedIn);
export default router;
