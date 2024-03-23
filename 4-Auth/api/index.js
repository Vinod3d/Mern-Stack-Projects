require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();
const cookieParser = require('cookie-parser');
const path = require( 'path' );

const _dirname = path.resolve();

//  routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

app.get('/', (req, res)=>{
    res.send('e-commerce api');
});


app.use(express.json());
app.use(express.static(path.join(_dirname + '/client/dist')));
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'client','dist','index.html'));
})
app.use(cookieParser());
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