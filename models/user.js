var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var secretConfig = require("../configs/secret");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  username : {
    type : String,
    unique : true
  },
  bio : String,
  created : {type: Date, default: Date.now},
  avatarPath : String,
  avatarPathThumbnail : String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lasstName: this.lastName,
    username: this.username,
    bio: this.bio,
    avatarPath : this.avatarPath,
    avatarPathThumbnail : this.avatarPathThumbnail,
    exp: parseInt(expiry.getTime() / 1000),
  }, secretConfig.getSecret()); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);