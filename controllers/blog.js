import asyncHandler from "express-async-handler";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const getPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findOne(
      { _id: req.params.postId, published: true },
      "title posted edited",
    )
      .populate("user", "username")
      .exec();

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find(
      { published: true },
      "title user posted edited",
    )
      .sort({ edited: -1 })
      .populate("user", "username")
      .exec();

    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

export const getComments = asyncHandler(async (req, res, next) => {
  try {
    const comments = Comment.find(
      { post: req.params.postId },
      "content",
    ).exec();

    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});
