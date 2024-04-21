import express from "express";
import blogRouter from "./blog.js";
import dashboardRouter from "./dashboard.js";
import profileRouter from "./profile.js";
const router = express.Router();

router.use("/api/blog", blogRouter);
router.use("/api/profile", profileRouter);
router.use("/api/dashboard", dashboardRouter);

export default router;
