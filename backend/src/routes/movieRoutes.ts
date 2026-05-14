import express from "express";

import {
  searchMovieController,
  getMovieDetailsController,
  getUserMoviesController
} from "../controllers/movieController";

import protect from "../middleware/authMiddleware";

import {
  addToListController,
} from "../controllers/movieController";

const router = express.Router();

router.get(
  "/search",
  searchMovieController
);

router.get(
  "/user/list",
  protect,
  getUserMoviesController
);

router.post(
  "/list",
  protect,
  addToListController
);

router.get(
  "/:id",
  getMovieDetailsController
);

export default router;