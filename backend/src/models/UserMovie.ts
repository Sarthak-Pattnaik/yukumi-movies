import mongoose from "mongoose";

const userMovieSchema =
  new mongoose.Schema({

    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    movie: {

      id: {

        type: Number,

        required: true,
      },

      title: {

        type: String,

        required: true,
      },

      poster_path: {

        type: String,
      },

      backdrop_path: {

        type: String,
      },
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
  },
  {
    timestamps: true,
  }
);

const UserMovie =
  mongoose.model(
    "UserMovie",
    userMovieSchema
  );

export default UserMovie;