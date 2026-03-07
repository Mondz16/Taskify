import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    due_date: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Card", cardSchema);
