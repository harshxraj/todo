import mongoose, { Schema } from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    column: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("todo", todoSchema);
