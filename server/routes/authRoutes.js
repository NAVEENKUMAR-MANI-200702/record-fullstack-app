import express from "express";
import {
  registerUser,
  loginUser,
  isLoggedIn,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/isLoggedIn", isLoggedIn);

export default router;
