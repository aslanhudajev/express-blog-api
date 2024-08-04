import "dotenv/config";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";

import rootRouter from "./routes/root.js";
import User from "./models/user.js";

await mongoose
  .connect(process.env.MDB, { dbName: process.env.DB })
  .then(() => console.log("MDB connected succesfully"))
  .catch((error) => console.log(`Error when connectiong to MDB: ${error}`));

const app = express();

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(jwtOpts, async (jwt_payload, done) => {
    const user = await User.findOne({ _id: jwt_payload.id });

    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  }),
);

app.use(cors());
app.use(passport.initialize());
app.use(express.static("./public"));
app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", rootRouter);

app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: {
      name: "Error",
      status: "404",
      message: "Invalid api request.",
    },
    message: "This route is invalid.",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Application started, listening for port ${process.env.PORT}`);
});
