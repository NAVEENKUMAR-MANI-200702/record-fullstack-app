import cloudinary from "../config/cloudinary.js";
import APIResponse from "../utils/APIResponse.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(APIResponse.failure(400, "No file uploaded"));
    }

    const base64 = req.file.buffer.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${base64}`,
      {
        folder: "onboarding",
      },
    );

    return res.json(
      APIResponse.success({
        url: result.secure_url,
      }),
    );
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json(APIResponse.failure(500, err.message));
  }
};
