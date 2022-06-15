import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import EventRoute from "./Routes/EventRoute.js";
import ForumRoute from "./Routes/ForumRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import verifyJWT from "./middleware/verifyJWT.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

// to serve images for public
app.use(express.static('public'))
app.use('/images/', express.static('images'))

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extened: true }));
app.use(express.urlencoded({ limit: "30mb", extened: true }));
dotenv.config();

//middleware for cookies

// Usage of routes

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/upload", UploadRoute);

// Authentication required routes

app.use(verifyJWT);
app.use("/event", EventRoute);
app.use("/forum", ForumRoute);


// Connect MongoDb 

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 8080, () =>
      console.log(`Listening on ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));
