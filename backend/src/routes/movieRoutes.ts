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
  getUserStatsController,
  toggleReviewLikeController,
  getCommunityController,
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

router.patch(
  "/reviews/like/:id",
  protect,
  toggleReviewLikeController
);

router.get(
  "/stats/user",
  protect,
  getUserStatsController
);

router.get(
  "/community/activity",
  protect,
  getCommunityController
);


router.get(
  "/:id",
  getMovieDetailsController
);

export default router;