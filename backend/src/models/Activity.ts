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