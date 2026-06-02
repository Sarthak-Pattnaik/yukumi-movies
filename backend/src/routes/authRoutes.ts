import express from "express";

import protect from "../middleware/authMiddleware";

import {
  registerUser,
  loginUser,
  getMe,
  toggleFollowController,
  getUserProfileController,
  getNotificationsController,
  updateProfileController,
  logoutController,
  searchUsersController
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);


router.patch(
  "/follow/:id",
  protect,
  toggleFollowController
);

router.get(
  "/profile/:id",
  getUserProfileController
);

router.get(
  "/notifications",
  protect,
  getNotificationsController
);

router.patch(
  "/profile/update",
  protect,
  updateProfileController
);

router.post(
  "/logout",
  logoutController
);

router.get(
  "/search/users",
  protect,
  searchUsersController
);


export default router;