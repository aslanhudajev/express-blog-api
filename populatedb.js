import mongoose from "mongoose";
import "dotenv/config";
import post from "./models/post.js";
import comment from "./models/comment.js";

await mongoose.connect(process.env.MDB, { dbName: process.env.DB });

const posts = [];
const comments = [];

const newPost = {
  title: "Hello World!",
  content: "Hello dear world! It is a beautiful day!",
  posted: Date.now(),
  edited: Date.now(),
  published: true,
};

for (let i = 0; i < 5; i++) {
  const createPost = new post({ ...newPost });
  const createComment = new comment({
    content: "This is a comment",
    post: createPost,
  });

  await createPost.save();
  await createComment.save();
}
