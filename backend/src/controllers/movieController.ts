import { Request, Response } from "express";
import { getMovieDetails, searchMovies } from "../services/tmdbService";
import User from "../models/User";
import UserMovie from "../models/UserMovie";
import Review from "../models/Review";
import Activity from "../models/Activity";
import Notification from "../models/Notification";
import { AuthRequest } from "../middleware/authMiddleware";
import {
  Types,
} from "mongoose";


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

        movie,

        status,

        rating,

        favorite,
      } = req.body;

      const existingEntry =
        await UserMovie.findOne({

          userId:
            req.userId,

          "movie.id":
            movie.id,
        });

      if (existingEntry) {

        return res.status(400).json({
          message:
            "Movie already in list",
        });
      }

      const entry =
        await UserMovie.create({

          userId:
            req.userId,

          movie,

          status,

          rating,

          favorite,
        });

      if (
        status ===
        "completed"
      ) {

        await Activity.create({

          userId:
            req.userId,

          type:
            "completed",

          movie,
        });
      }

      if (favorite) {

        await Activity.create({

          userId:
            req.userId,

          type:
            "favorite",

          movie,
        });
      }

      res.status(201).json(
        entry
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
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

          userId:
            req.userId,
        })

          .sort({
            updatedAt: -1,
          });

      const formattedMovies =
        userMovies.map(
          (entry) => ({

            _id:
              entry._id,

            status:
              entry.status,

            rating:
              entry.rating,

            favorite:
              entry.favorite,

            movie:
              entry.movie,

            updatedAt:
              entry.updatedAt,
          })
        );

      res.status(200).json(
        formattedMovies
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });

    }
  };

export const updateUserMovieController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } =
        req.params;

      const {
        status,
        rating,
        favorite,
      } = req.body;

      const updatedMovie =
        await UserMovie.findOneAndUpdate(

          {
            _id: id,

            userId:
              req.userId,
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

      const existingMovie =
        await UserMovie.findOne({
          _id: id,
          userId: req.userId,
        });

      if (

        existingMovie?.status !==
        "completed"

        &&

        status ===
        "completed"
      ) {

        await Activity.create({

          userId:
            req.userId,

          type:
            "completed",

          movie:
            updatedMovie.movie,
        });
      }


      if (
        !existingMovie?.favorite &&
        favorite
      ) {

        await Activity.create({

          userId:
            req.userId,

          type:
            "favorite",

          movie:
            updatedMovie.movie,
        });
      }

      res.status(200).json(
        updatedMovie
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
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
        movie,
        reviewText,
      } = req.body;

      const review =
        await Review.create({

          userId: req.userId,

          movie,

          reviewText,
        });

      await Activity.create({

        userId: req.userId,

        type: "review",

        movie,

        text: reviewText,
      });

      res.status(201).json(
        review
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
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
        Number(
          req.params.movieId
        );

      const reviews =
        await Review.find({

          "movie.id":
            movieId,
        })

          .populate(
            "userId",
            "username avatar"
          )

          .sort({
            createdAt: -1,
          });

      const formattedReviews =
        reviews.map(
          (review) => ({

            _id:
              review._id,

            movie:
              review.movie,

            reviewText:
              review.reviewText,

            createdAt:
              review.createdAt,

            likes:
              review.likes,

            likeCount:
              review.likes
                .length,

            userId:
              review.userId,
          })
        );

      res.status(200).json(
        formattedReviews
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
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

export const getUserStatsController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const userMovies =
        await UserMovie.find({
          userId: req.userId,
        });

      const reviews =
        await Review.find({
          userId: req.userId,
        });

      const totalMovies =
        userMovies.length;

      const completedMovies =
        userMovies.filter(
          (movie) =>
            movie.status ===
            "completed"
        ).length;

      const watchingMovies =
        userMovies.filter(
          (movie) =>
            movie.status ===
            "watching"
        ).length;

      const plannedMovies =
        userMovies.filter(
          (movie) =>
            movie.status ===
            "plan_to_watch"
        ).length;

      const droppedMovies =
        userMovies.filter(
          (movie) =>
            movie.status ===
            "dropped"
        ).length;

      const favoriteMovies =
        userMovies.filter(
          (movie) =>
            movie.favorite
        ).length;

      const ratedMovies =
        userMovies.filter(
          (movie) =>
            movie.rating
        );

      const averageRating =
        ratedMovies.length > 0

          ? (
            ratedMovies.reduce(
              (
                acc,
                movie
              ) =>
                acc + (movie.rating || 0),
              0
            ) / ratedMovies.length
          ).toFixed(1)

          : 0;

      res.status(200).json({

        totalMovies,

        completedMovies,

        watchingMovies,

        plannedMovies,

        droppedMovies,

        favoriteMovies,

        totalReviews:
          reviews.length,

        averageRating,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const toggleReviewLikeController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } = req.params;

      const review =
        await Review.findById(id);

      if (!review) {

        return res.status(404).json({
          message:
            "Review not found",
        });
      }

      const alreadyLiked =
        review.likes.some(
          (userId) =>
            userId.toString() ===
            req.userId
        );

      if (alreadyLiked) {

        review.likes =
          review.likes.filter(
            (userId) =>
              userId.toString() !==
              req.userId
          );

      } else {

        review.likes.push(
          req.userId as any
        );
      }

      await review.save();

      res.status(200).json({

        liked:
          !alreadyLiked,

        likeCount:
          review.likes.length,
      });

      if (
        review.userId.toString() !==
        req.userId
      ) {

        await Notification.create({

          recipientId:
            review.userId,

          senderId:
            req.userId,

          type: "like",

          reviewId:
            review._id,
        });
      }

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const getCommunityController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const user =
        await User.findById(
          req.userId
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const communityUserIds = [

        ...(user.following || []),

        req.userId,
      ].filter(Boolean);

      const community =
        await Activity.find({

          userId: {

            $in:
              communityUserIds as Types.ObjectId[],
          },
        })

          .sort({
            createdAt: -1,
          })

          .limit(50)

          .populate(
            "userId",
            "username avatar"
          );

      const formattedCommunity =
        community.map(
          (activity) => ({

            _id:
              activity._id,

            type:
              activity.type,

            text:
              activity.text,

            createdAt:
              activity.createdAt,

            movie:
              activity.movie,

            user:
              activity.userId,
          })
        );

      res.status(200).json(
        formattedCommunity
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });

    }
  };
