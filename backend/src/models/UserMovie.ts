import mongoose from "mongoose";

const userMovieSchema =
  new mongoose.Schema({

    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    movieId: {
      type: Number,

      required: true,
    },

    status: {
      type: String,

      enum: [
        "watching",
        "completed",
        "plan_to_watch",
        "dropped",
      ],

      default: "plan_to_watch",
    },

    rating: {
      type: Number,

      min: 1,

      max: 10,
    },

    favorite: {
      type: Boolean,

      default: false,
    },

    createdAt: {
      type: Date,

      default: Date.now,
    },
  });

const UserMovie =
  mongoose.model(
    "UserMovie",
    userMovieSchema
  );

export default UserMovie;