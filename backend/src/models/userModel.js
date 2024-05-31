const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have name "],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User must have mail"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Week password"],
      trim: true,
      select: false,
    },
    confirmedPassword: {
      type: String,
      required: [true, "Enter your confirmed password"],
      // This only works on CREATE , SAVE and not on UPDATE .
      validate: {
        validator: function (pswConfirmed) {
          return pswConfirmed === this.password;
        },
        message: "Password doesn't match",
      },
    },
  },
  {
    // To include virtuals in res.json(), you need to set the toJSON schema option to { virtuals: true }.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Encrypt password before saving to database
// This middleware will run if only password field is modified
userSchema.pre("save", async function (next) {
  // this ===> Current document
  // If password field is not modified , then exit the function and call the next middleware function
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // When the validation was successful, we actually no longer need this field so we really do not want to persist it to the database. And so that's why we simply set it here to undefined.
  this.set("confirmedPassword", undefined, { strict: false });

  next();
});

// Instance method
userSchema.methods.checkPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
