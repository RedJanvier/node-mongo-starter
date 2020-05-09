import { Schema, model } from "mongoose";

const IndexSchema = new Schema({
  text: {
    type: String,
    require: [true, "Please Provide some text for the test"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Index", IndexSchema);
