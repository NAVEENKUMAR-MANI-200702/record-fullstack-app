import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import APIResponse from "../utils/APIResponse.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(APIResponse.failure(400, "Email and Password are required"));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json(APIResponse.failure(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json(
      APIResponse.success({
        user: {
          id: user._id,
          email: user.email,
        },
        token: generateToken(user._id),
      }),
    );
  } catch (error) {
    return res.status(500).json(APIResponse.failure(500, error.message));
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(APIResponse.failure(400, "Email and Password are required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json(APIResponse.failure(400, "Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json(APIResponse.failure(400, "Invalid credentials"));
    }

    return res.json(
      APIResponse.success({
        user: {
          id: user._id,
          email: user.email,
        },
        token: generateToken(user._id),
      }),
    );
  } catch (error) {
    return res.status(500).json(APIResponse.failure(500, error.message));
  }
};

export const isLoggedIn = async (req, res) => {
  return res.json(
    APIResponse.success({
      isLoggedIn: true,
      user: req.user,
    }),
  );
};
