import { Request, Response } from "express";
import { getMovieDetails, searchMovies } from "../services/tmdbService";
import UserMovie from "../models/UserMovie";
import Review from "../models/Review";
import { AuthRequest } from "../middleware/authMiddleware";


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
        favorite,
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

          favorite,
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

                favorite:
                  entry.favorite,

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

export const updateUserMovieController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } = req.params;

      const {
        status,
        rating,
        favorite,
      } = req.body;

      const updatedMovie =
        await UserMovie.findOneAndUpdate(

          {
            _id: id,

            userId: req.userId,
          },

          {
            status,
            rating,
            favorite,
          },

          {
            new: true,
          }
        );

      if (!updatedMovie) {

        return res.status(404).json({
          message:
            "Movie entry not found",
        });
      }

      res.status(200).json(
        updatedMovie
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const removeUserMovieController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } = req.params;

      const deletedMovie =
        await UserMovie.findOneAndDelete({

          _id: id,

          userId: req.userId,
        });

      if (!deletedMovie) {

        return res.status(404).json({
          message:
            "Movie entry not found",
        });
      }

      res.status(200).json({
        message:
          "Movie removed successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const addReviewController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        movieId,
        reviewText,
      } = req.body;

      const review =
        await Review.create({

          userId: req.userId,

          movieId,

          reviewText,
        });

      res.status(201).json(
        review
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const getMovieReviewsController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const movieId =
        Number(req.params.movieId);

      const reviews =
        await Review.find({
          movieId,
        }).populate(
          "userId",
          "username"
        );

      res.status(200).json(
        reviews
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const updateReviewController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } = req.params;

      const { reviewText } =
        req.body;

      const updatedReview =
        await Review.findOneAndUpdate(

          {
            _id: id,

            userId: req.userId,
          },

          {
            reviewText,
          },

          {
            new: true,
          }
        );

      if (!updatedReview) {

        return res.status(404).json({
          message:
            "Review not found",
        });
      }

      res.status(200).json(
        updatedReview
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }

    console.log("Review route hit");
  };

export const deleteReviewController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } = req.params;

      const deletedReview =
        await Review.findOneAndDelete({

          _id: id,

          userId: req.userId,
        });

      if (!deletedReview) {

        return res.status(404).json({
          message:
            "Review not found",
        });
      }

      res.status(200).json({
        message:
          "Review deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };