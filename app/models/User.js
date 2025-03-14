const mongoose = require("mongoose")
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
      },
      email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
      },
      role: {
        type: String,
        enum: ['user', 'client', 'admin'],
        default: 'user'
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
      },
      confirmPassword: {
        type: String,
        validate: {
          validator: function(value) {
            return value === this.password;
          },
          message: 'Passwords do not match'
        }
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
      active: {
        type: Boolean,
        default: true,
        select: false
      }
});

  UserSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.confirmPassword = undefined;
    next();
  });

  UserSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });

  UserSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });

  UserSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };

  UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

  


const User = mongoose.model('User',UserSchema)

module.exports = User;