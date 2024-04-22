import express from "express";
import * as dashboardController from "../controllers/dashboard.js";
const router = express.Router();

//Authentication
router.post("/signin");
router.post("/signout");

//POSTS
///Create
router.post(
  "/new-post",
  //dashboardController.validatePostBody,
  dashboardController.createPost,
);

//Read
router.get("/posts", dashboardController.getPosts);
router.get("/post/:postId", dashboardController.getPost);

//Update
router.post(
  "/edit/:postId",
  //dashboardController.validatePostBody,
  dashboardController.editPost,
);

//Delete
router.post("/delete/:postId", dashboardController.deletePost);

export default router;
