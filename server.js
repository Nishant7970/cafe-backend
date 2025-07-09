import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

app.use("/api/users", userRouter);

mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.5jgsi4d.mongodb.net/mern-cafe?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  app.listen(8080, () => {
    console.log("Server started at 8080");
  });
});

