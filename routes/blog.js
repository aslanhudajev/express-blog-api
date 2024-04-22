import express from "express";
import * as blogController from "../controllers/blog.js";
const router = express.Router();

router.get("/post/:postId", blogController.getPost);
router.get("/posts", blogController.getPosts);
router.get("/comments/:postId", blogController.getComments);

export default router;
