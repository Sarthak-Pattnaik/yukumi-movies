import express from "express";

import {
  searchMovieController,
  getMovieDetailsController,
  getUserMoviesController,
  addToListController,
  updateUserMovieController,
  removeUserMovieController,
  addReviewController,
  getMovieReviewsController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/movieController";

import protect from "../middleware/authMiddleware";

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

router.patch(
  "/list/:id",
  protect,
  updateUserMovieController
);

router.delete(
  "/list/:id",
  protect,
  removeUserMovieController
);

router.post(
  "/reviews",
  protect,
  addReviewController
);

router.get(
  "/reviews/:movieId",
  getMovieReviewsController
);

router.patch(
  "/reviews/:id",
  protect,
  updateReviewController
);

router.delete(
  "/reviews/:id",
  protect,
  deleteReviewController
);

router.get(
  "/:id",
  getMovieDetailsController
);

export default router;