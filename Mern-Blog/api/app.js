require('dotenv').config();
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');


app.get('/', (req, res)=>{
    res.send('e-commerce api');
});




const port = process.env.PORT || 5000;
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