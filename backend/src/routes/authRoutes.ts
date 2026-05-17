import express from "express";

import protect from "../middleware/authMiddleware";

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  toggleFollowController,
  getUserProfileController
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post("/logout", logoutUser);

router.patch(
  "/follow/:id",
  protect,
  toggleFollowController
);

router.get(
  "/profile/:id",
  getUserProfileController
);

export default router;