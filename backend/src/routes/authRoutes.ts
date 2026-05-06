import express from "express";

import protect from "../middleware/authMiddleware";

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post("/logout", logoutUser);

export default router;