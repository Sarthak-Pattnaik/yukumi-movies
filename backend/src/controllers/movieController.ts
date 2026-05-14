import { Request, Response } from "express";
import { getMovieDetails } from "../services/tmdbService";
import UserMovie from "../models/UserMovie";

import {
  AuthRequest,
} from "../middleware/authMiddleware";

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

export const addToListController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        movieId,
        status,
        rating,
      } = req.body;

      const existingEntry =
        await UserMovie.findOne({
          userId: req.userId,

          movieId,
        });

      if (existingEntry) {

        return res.status(400).json({
          message:
            "Movie already in list",
        });
      }

      const entry =
        await UserMovie.create({

          userId: req.userId,

          movieId,

          status,

          rating,
        });

      res.status(201).json(entry);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const getUserMoviesController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const userMovies =
        await UserMovie.find({
          userId: req.userId,
        });

      const enrichedMovies =
        await Promise.all(

          userMovies.map(
            async (entry) => {

              const details =
                await getMovieDetails(
                  entry.movieId.toString()
                );

              return {

                _id: entry._id,

                movieId:
                  entry.movieId,

                status:
                  entry.status,

                rating:
                  entry.rating,

                movie: details,
              };
            }
          )
        );

      res.status(200).json(
        enrichedMovies
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };