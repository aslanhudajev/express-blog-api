import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Post from "../models/post.js";

export const signin = asyncHandler(async (req, res, next) => {});
export const signout = asyncHandler(async (req, res, next) => {});

export const getPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findOne(
      { _id: req.params.postId },
      "title posted edited",
    ).exec();

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({}, "title posted edited")
      .sort({ edited: -1 })
      .exec();

    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

//TODO
//TODO
//TODO: Add post request body validation here, make it usable for both update and create routes.
//TODO
//TODO
export const validatePostBody = [asyncHandler(async (req, res, next) => {})];

export const createPost = asyncHandler(async (req, res, next) => {
  try {
    const post = new Post({ ...req.body });
    await post.save();

    res.json({ post });
  } catch (error) {
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

export const deletePost = asyncHandler(async (req, res, next) => {
  try {
    await Post.findOneAndDelete({ _id: req.params.postId }).exec();

    res.status(200);
    res.json(200);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});
