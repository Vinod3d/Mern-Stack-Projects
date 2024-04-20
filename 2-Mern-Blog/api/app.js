require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
var cors = require('cors')

// database
const connectDB = require('./db/connect');

//  routers
const userRouter = require( './routes/userRoutes' );
const authRouter = require( './routes/authRoutes' );
const postRouter = require( './routes/postRoutes' );

// middleware imported
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');





//middleware use
app.use(express.json());
app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });



const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
