import express from "express";

import {
  searchMovieController,
  getMovieDetailsController
} from "../controllers/movieController";


const router = express.Router();

router.get(
  "/search",
  searchMovieController
);

router.get(
  "/:id",
  getMovieDetailsController
);

export default router;