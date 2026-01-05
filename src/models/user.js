const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Provide a string password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: `{VALUE} is not a valid gender.`,
      },
      validate(value) {
        if (![male, female].includes(value)) {
          throw new Error("geneder data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      defaut:
        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
      validator(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL ");
        }
      },
    },
    about: {
      type: String,
      default: "this is default data in about section",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// generate JWT
userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, "DevTineder@1234", {
    expiresIn: "7d",
  });
};

// validate password
userSchema.methods.validatePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
