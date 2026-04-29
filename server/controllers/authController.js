import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import APIResponse from "../utils/APIResponse.js";
import User from "../models/User.js";
import Form from "../models/Form.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json(
          APIResponse.failure(400, "Email, name and Password are required"),
        );
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
      name,
      password: hashedPassword,
    });

    return res.status(201).json(
      APIResponse.success(
        {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          token: generateToken(user._id),
        },
        201,
      ),
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
  const form = await Form.findOne({ userId: req.user.id });

  return res.json(
    APIResponse.success({
      isLoggedIn: true,
      user: req.user,
      completed: form?.completed || false,
      imageUrl: form?.step5?.imageUrl || null,
      name: req.user?.name || null,
      username: form?.step1?.username || null,
    }),
  );
};
