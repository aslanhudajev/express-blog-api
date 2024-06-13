import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import "dotenv/config.js";
import jwt from "jsonwebtoken";
import Post from "../models/post.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const signin = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    res.status(400);
    return res.send({
      success: false,
      message: "Username or password incorrect",
    });
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    res.status(400);
    return res.send({
      success: false,
      message: "Username or password incorrect",
    });
  }

  const payload = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

  res.status(200);
  return res.send({
    success: true,
    message: "Logged in",
    token: "Bearer " + token,
  });
});
export const signout = asyncHandler(async (req, res, next) => {});

export const getPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findOne(
      { _id: req.params.postId },
      "title description content published",
    ).exec();

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({}, "title posted edited description")
      .sort({ edited: -1 })
      .exec();

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

export const validatePostBody = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title can not be empty")
    .escape()
    .isLength({ min: 2, max: 124 })
    .withMessage("Title must be between 2-124 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description can not be empty")
    .escape()
    .isLength({ min: 100, max: 200 })
    .withMessage("Description must be between 100-200 characters"),
  body("content").notEmpty().withMessage("Post content can not be empty"),
  body("published")
    .isBoolean()
    .withMessage("You have to select how you want to save this article")
    .notEmpty()
    .withMessage("You have to select how you want to save this article"),

  asyncHandler(async (req, res, next) => {
    const validationErrors = validationResult(req).array();

    if (validationErrors.length > 0) {
      res.status(400);
      res.json(validationErrors);
    } else {
      return next();
    }
  }),
];

export const createPost = asyncHandler(async (req, res, next) => {
  try {
    const post = new Post({ ...req.body });
    await post.save();

    res.status(200);
    res.json({ post });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

export const editPost = asyncHandler(async (req, res, next) => {
  try {
    await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { ...req.body, edited: Date.now() },
    ).exec();

    res.status(200);
    res.json(200);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

export const editPassword = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  if (req.body.current === "") {
    res.status(400);
    return res.send({
      success: false,
      message: "Current password empty",
    });
  }

  const user = await User.findOne({ username: "admin" }).exec();
  const match = await bcrypt.compare(req.body.current, user.password);
  if (!match) {
    res.status(400);
    return res.send({
      success: false,
      message: "Current password is incorrect",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.findOneAndUpdate(
      { username: "admin" },
      { password: hashedPassword },
    );
    res.status(200);
    res.json({
      username: user.username,
      password: hashedPassword,
      status: 200,
      msg: "Password has been changed",
    });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

export const deletePost = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  try {
    await Post.findOneAndDelete({ _id: req.params.postId }).exec();

    res.status(200);
    res.json(200);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});
