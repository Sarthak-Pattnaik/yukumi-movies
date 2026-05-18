import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../middleware/authMiddleware";

import User from "../models/User";
import Notification from "../models/Notification";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken";

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,

      secure: false,

      sameSite: "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const user = await User.findById(
      req.userId
    ).select("-password");

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

export const logoutUser = async (
  req: Request,
  res: Response
) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

export const toggleFollowController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const currentUserId =
        req.userId;

      const targetUserId =
        req.params.id as string;

      if (
        currentUserId ===
        targetUserId
      ) {

        return res.status(400).json({
          message:
            "Cannot follow yourself",
        });
      }

      const currentUser =
        await User.findById(
          currentUserId
        );

      const targetUser =
        await User.findById(
          targetUserId
        );

      if (
        !currentUser ||
        !targetUser
      ) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const alreadyFollowing =
        currentUser.following.some(
          (id) =>
            id.toString() ===
            targetUserId
        );

      if (alreadyFollowing) {

        currentUser.following =
          currentUser.following.filter(
            (id) =>
              id.toString() !==
              targetUserId
          );

        targetUser.followers =
          targetUser.followers.filter(
            (id) =>
              id.toString() !==
              currentUserId
          );

      } else {

        currentUser.following.push(
          targetUserId as any
        );

        targetUser.followers.push(
          currentUserId as any
        );
      }

      await currentUser.save();

      await targetUser.save();

      res.status(200).json({

        following:
          !alreadyFollowing,

        followersCount:
          targetUser.followers.length,
      });

      await Notification.create({

        recipientId:
          targetUserId,

        senderId:
          currentUserId,

        type: "follow",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const getUserProfileController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        await User.findById(
          req.params.id
        ).select(
          "-password"
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.status(200).json(user);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };

export const getNotificationsController =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const notifications =
        await Notification.find({

          recipientId:
            req.userId,
        })

          .sort({
            createdAt: -1,
          })

          .populate(
            "senderId",
            "username"
          );

      res.status(200).json(
        notifications
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }
  };