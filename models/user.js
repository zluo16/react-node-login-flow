const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  local: {
    _id: { type: mongoose.Schema.Types.ObjectId },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }
});

userSchema.methods.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.checkPasswordValidation = (password) => {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema);
