import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      required: true,
      minlength: [3, "fullname must be 3 letters long"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: String,
    todos: {
      type: [Schema.Types.ObjectId],
      ref: "todo",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
