import express, { urlencoded } from "express";
import mongoose from "mongoose";
import "dotenv/config";

import rootRouter from "./routes/root.js";

await mongoose
  .connect(process.env.MDB, { dbName: process.env.DB })
  .then(() => console.log("MDB connected succesfully"))
  .catch((error) => console.log(`Error when connectiong to MDB: ${error}`));

const app = express();

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
