import mongoose from "mongoose";

const activitySchema =
  new mongoose.Schema({

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    type: {
      type: String,

      enum: [
        "review",
        "completed",
        "favorite",
      ],

      required: true,
    },

    movieId: {
      type: Number,

      required: true,
    },

    text: {
      type: String,
    },

    createdAt: {
      type: Date,

      default: Date.now,
    },
  });

const Activity =
  mongoose.model(
    "Activity",
    activitySchema
  );

export default Activity;