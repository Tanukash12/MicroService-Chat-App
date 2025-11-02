import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {createClient} from 'redis'
import userRoutes from "./routes/user.js";

dotenv.config();

connectDB();

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not defined");
}

export const redisClient = createClient({
  url: redisUrl,
});

redisClient
.connect()
.then(() => console.log("Connected to Redis"))
.catch(console.error);

const app = express();
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});


