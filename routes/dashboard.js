import express from "express";
import passport from "passport";
import * as dashboardController from "../controllers/dashboard.js";
const router = express.Router();

//Authentication
router.post("/signin", dashboardController.signin);
router.post("/signout");

//POSTS
///Create
router.post(
  "/new-post",
  passport.authenticate("jwt", { session: false }),
  dashboardController.validatePostBody,
  dashboardController.createPost,
);

//Read
router.get(
  "/authenticate",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200);
    res.send({ success: true });
  },
);
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  dashboardController.getPosts,
);
router.get(
  "/post/:postId",
  passport.authenticate("jwt", { session: false }),
  dashboardController.getPost,
);

//Update
router.post(
  "/edit/password",
  passport.authenticate("jwt", { session: false }),
  dashboardController.editPassword,
);
router.post(
  "/edit/:postId",
  passport.authenticate("jwt", { session: false }),
  dashboardController.validatePostBody,
  dashboardController.editPost,
);

//Delete
router.post(
  "/delete/:postId",
  passport.authenticate("jwt", { session: false }),
  dashboardController.deletePost,
);

export default router;
