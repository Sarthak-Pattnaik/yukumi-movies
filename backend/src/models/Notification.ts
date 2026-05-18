import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema({

    recipientId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    senderId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    type: {
      type: String,

      enum: [
        "follow",
        "like",
      ],

      required: true,
    },

    reviewId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Review",
    },

    isRead: {
      type: Boolean,

      default: false,
    },

    createdAt: {
      type: Date,

      default: Date.now,
    },
  });

const Notification =
  mongoose.model(
    "Notification",
    notificationSchema
  );

export default Notification;