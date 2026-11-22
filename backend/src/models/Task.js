import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "archived"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    category: {
      type: String,
      enum: [
        "concierge",
        "viewing_request",
        "watch_sourcing",
        "maintenance",
        "valuation",
        "custody_escrow",
        "custom",
      ],
      default: "concierge",
    },
    watchId: {
      type: String,
      default: "",
    },
    watchName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "Mumbai BKC Flagship Suite",
    },
    dueDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required for task ownership"],
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
