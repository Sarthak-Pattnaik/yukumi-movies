import { Request, Response } from "express";
import { getMovieDetails } from "../services/tmdbService";

import {
  searchMovies,
} from "../services/tmdbService";

export const searchMovieController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const query =
        req.query.query as string;

      if (!query) {
        return res.status(400).json({
          message: "Query required",
        });
      }

      const movies =
        await searchMovies(query);

      res.status(200).json(movies);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const getMovieDetailsController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const id = req.params.id as string;

      const movie =
        await getMovieDetails(id);

      res.status(200).json(movie);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };