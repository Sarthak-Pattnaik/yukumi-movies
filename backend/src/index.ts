import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import movieRoutes from "./routes/movieRoutes";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";

dotenv.config();

const startServer = async () => {

  try {

    await connectDB();

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Failed to start server",
      error
    );

    process.exit(1);
  }
};

startServer();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API running");
});

app.get(
  "/api/health",
  (req, res) => {

    res.status(200).json({
      status: "ok",
    });

  }
);