import mongoose from "mongoose";

const reviewSchema =
  new mongoose.Schema({

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,

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

    reviewText: {
      type: String,

      required: true,
    },

    likes: [
      {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    ],

    createdAt: {
      type: Date,

      default: Date.now,
    },
  });

const Review =
  mongoose.model(
    "Review",
    reviewSchema
  );

export default Review;