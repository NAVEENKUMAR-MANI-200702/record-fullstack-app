import jwt from "jsonwebtoken";
import User from "../models/User.js";
import APIResponse from "../utils/APIResponse.js";

const authMiddleware = async (req, res, next) => {
  try {
    // ─── Read token from cookie (primary) or Bearer header (fallback) ───
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // ────────────────────────────────────────────────────────────────────

    if (!token) {
      return res.json(
        APIResponse.failure(401, "No token provided", { isLoggedIn: false })
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.json(
        APIResponse.failure(401, "User not found", { isLoggedIn: false })
      );
    }

    req.user = user;
    return next();

  } catch (error) {
    return res.json(
      APIResponse.failure(401, "Invalid or expired token", { isLoggedIn: false })
    );
  }
};

export default authMiddleware;