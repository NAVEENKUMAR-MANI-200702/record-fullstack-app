import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("ENV LOADED:", {
  mongo: process.env.MONGO_URI,
  cloud: process.env.CLOUD_NAME,
});