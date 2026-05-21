import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  followers: [
    {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  ],

  following: [
    {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  ],

  avatar: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  tagline: {
    type: String,

    default:
      "Movie Enthusiast",
  },

  bio: {
    type: String,

    default:
      "Tracking films, writing reviews, and building a cinematic journey.",
  },
});

const User = mongoose.model("User", userSchema);

export default User;