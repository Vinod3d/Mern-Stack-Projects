const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async (url) => {
  try {
    await mongoose
      .connect(url);
    return console.log("CONNECTED TO THE DB...");
  } catch (err) {
    return console.log(err);
  } 
};


module.exports = connectDB