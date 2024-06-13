import express from "express";
import blogRouter from "./blog.js";
import dashboardRouter from "./dashboard.js";
import passport from "passport";
//import profileRouter from "./profile.js";
const router = express.Router();

router.use("/blog", blogRouter);
//decreased scope: only making one user.
//might make it into a 'medium' clone at a later date.
//router.use("/api/profile", profileRouter);
router.use("/dashboard", dashboardRouter);

export default router;
