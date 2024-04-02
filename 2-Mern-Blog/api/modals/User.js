const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {timestamps:true});

// UserSchema.pre('save', async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.comparePassword = async function (canditatePassword) {
//   const isMatch = await bcrypt.compare(canditatePassword, this.password);
//   return isMatch;
// };

module.exports = mongoose.model('User', UserSchema);
