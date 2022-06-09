import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import EventRoute from './Routes/EventRoute.js'
import ForumRoute from './Routes/ForumRoute.js'
import RefreshRoute from './Routes/RefreshRoute.js'
import LogoutRoute from './Routes/LogoutRoute.js'
import verifyJWT from './middleware/verifyJWT.js'
import cors from 'cors';



const corsOptions ={
  origin:'*', 
  credentials:true,          
  optionSuccessStatus:200,
}


const app = express();


// Middleware
app.use(cors(corsOptions));
app.use(express.json({limit: '30mb', extened: true}));
app.use(express.urlencoded({limit: '30mb', extened: true}));
dotenv.config()

// Usage of routes
app.use('/auth', AuthRoute)
app.use('/logout', LogoutRoute)

app.use(verifyJWT);
app.use('/user', UserRoute)
app.use('/event', EventRoute)
app.use('/forum', ForumRoute)
app.use('/refresh', RefreshRoute)

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)))
.catch((error) => console.log(error))

