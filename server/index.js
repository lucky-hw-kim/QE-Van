import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import EventRoute from './Routes/EventRoute.js'
import ForumRoute from './Routes/ForumRoute.js'
// import corsOptions from './config/corsOptions.js';
import cors from 'cors';

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

// Routes
const app = express();


// Middleware
app.use(cors(corsOptions));
app.use(express.json({limit: '30mb', extened: true}));
app.use(express.urlencoded({limit: '30mb', extened: true}));
dotenv.config()

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)))
.catch((error) => console.log(error))

// Usage of routes

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/event', EventRoute)
app.use('/forum', ForumRoute)
