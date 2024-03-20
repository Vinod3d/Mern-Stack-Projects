require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();

//  routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

app.get('/', (req, res)=>{
    res.send('e-commerce api');
});


app.use(express.json()); // middleware for parsing json
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.use((err, req, res, next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})


const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();