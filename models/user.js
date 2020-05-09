import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    require: [true, "Please Provide a name"],
  },
  age: {
    type: Number,
    required: [true, "Please Provide an age"],
  },
  email: {
    type: String,
    unique: [true, "The email is already in use"],
    required: [true, "Please Provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("User", UserSchema);
