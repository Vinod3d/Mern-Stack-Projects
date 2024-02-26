require('dotenv').config();
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');


//  routers
const userRouter = require( './routes/userRoutes' );
const authRouter = require( './routes/authRoutes' );

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.get('/', (req, res)=>{
    res.send('e-commerce api');
});

//middleware
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    await connectDB(process.env.MONGO_URL);
    app.listen(5000, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
