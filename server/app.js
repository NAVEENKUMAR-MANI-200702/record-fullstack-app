import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes);
app.use("/api/skills", skillRoutes);

export default app;
