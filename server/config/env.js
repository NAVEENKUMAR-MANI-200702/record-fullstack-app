import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("ENV LOADED:", {
  mongo: process.env.MONGO_URI,
  cloud: process.env.CLOUD_NAME,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
});