import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute.js";
import productRouter from "./Routes/productRoute.js"
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const dbuser = encodeURIComponent(process.env.DBUSER);
// const dbpass = encodeURIComponent(process.env.DBPASS);

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);

// mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.5jgsi4d.mongodb.net/mern-cafe?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
//   app.listen(8080, () => {
//     console.log("Server started at 8080");
//   });
// });
mongoose.connect(`mongodb+srv://nk7970922655:SmJmHiU0S9UiCprp@cluster0.5jgsi4d.mongodb.net/mern-cafe2?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(8080, () => {
      console.log("Server started at 8080");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });


