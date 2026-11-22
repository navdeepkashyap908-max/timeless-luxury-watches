import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["collector", "connoisseur", "salon_director", "admin"],
      default: "collector",
    },
    tier: {
      type: String,
      default: "Tier-1 Geneva Priority",
    },
    phone: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "Mumbai",
    },
    wishlist: {
      type: [String],
      default: ["royal-chronometer", "sovereign-celestial", "constellation-diamond"],
    },
    bag: {
      type: [
        {
          watchId: { type: String, required: true },
          quantity: { type: Number, default: 1, min: 1 },
          selectedStrap: { type: String, default: "default" },
          selectedDial: { type: String, default: "default" },
          bespokePrice: { type: Number },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const secret = process.env.JWT_SECRET || "timeless_jwt_secret_dev_fallback_2026";
  const expiresIn = process.env.JWT_EXPIRE || "7d";
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    secret,
    { expiresIn }
  );
};

export const User = mongoose.model("User", userSchema);
