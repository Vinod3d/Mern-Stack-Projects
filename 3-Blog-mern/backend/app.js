require('dotenv').config();

// express
const express = require('express');
const app = express();

// rest of the packages
const cors = require('cors');
const cookieParser = require('cookie-parser');

// database
const connectDB = require('./db/connect');


//  routers
const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes');


// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.JWT_SECRET));


app.get('/', (req, res)=>{
    res.send('e-commerce api');
});


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blog', blogRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);









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
