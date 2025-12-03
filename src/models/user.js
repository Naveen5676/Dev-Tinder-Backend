const mongoose = require("mongoose");
const validator = require("validator")

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
      lowercase: true,
      validator(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid email address" + value)
        }
      }
    },
    password: {
      type: String,
      required: true,
      validator(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Provide a string password")
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
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
      validator(value){
        if(!validator.isURL(value)){
          throw new Error("Invalid URL ")
        }
      }
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

module.exports = mongoose.model("User", userSchema);
