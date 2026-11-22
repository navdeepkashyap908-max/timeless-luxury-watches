import express from "express";
import { User } from "../models/User.js";
import { protect } from "../middleware/auth.js";
import { validateRegister, validateLogin } from "../middleware/validate.js";

const router = express.Router();

// @desc    Register a new collector account
// @route   POST /api/auth/register
// @access  Public
router.post("/register", validateRegister, async (req, res, next) => {
  try {
    const { name, email, password, phone, city } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "A collector account with this email address already exists.",
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || "",
      city: city || "Mumbai",
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "Collector account successfully established.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
        phone: user.phone,
        city: user.city,
        wishlist: user.wishlist,
        bag: user.bag,
      },
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Authenticate collector & obtain JWT token
// @route   POST /api/auth/login
// @access  Public
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password credentials.",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password credentials.",
      });
    }

    const token = user.generateAuthToken();

    res.json({
      success: true,
      message: "Authentication verified. Welcome to TIMELESS Salon.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
        phone: user.phone,
        city: user.city,
        wishlist: user.wishlist,
        bag: user.bag,
      },
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get current authenticated collector profile
// @route   GET /api/auth/me
// @access  Private
router.get("/me", protect, async (req, res, next) => {
  try {
    const userPayload = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      tier: req.user.tier,
      phone: req.user.phone,
      city: req.user.city,
      wishlist: req.user.wishlist,
      bag: req.user.bag,
      createdAt: req.user.createdAt,
    };

    res.json({
      success: true,
      user: userPayload,
      data: userPayload,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update collector profile details
// @route   PUT /api/auth/profile
// @access  Private
router.put("/profile", protect, async (req, res, next) => {
  try {
    const fieldsToUpdate = {};
    if (req.body.name) fieldsToUpdate.name = req.body.name.trim();
    if (req.body.phone !== undefined) fieldsToUpdate.phone = req.body.phone;
    if (req.body.city !== undefined) fieldsToUpdate.city = req.body.city;
    if (req.body.wishlist !== undefined) fieldsToUpdate.wishlist = req.body.wishlist;
    if (req.body.bag !== undefined) fieldsToUpdate.bag = req.body.bag;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Collector profile synchronized successfully.",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        tier: updatedUser.tier,
        phone: updatedUser.phone,
        city: updatedUser.city,
        wishlist: updatedUser.wishlist,
        bag: updatedUser.bag,
      },
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Toggle a watch in the collector's wishlist
// @route   POST /api/auth/wishlist/toggle
// @access  Private
router.post("/wishlist/toggle", protect, async (req, res, next) => {
  try {
    const { watchId } = req.body;
    if (!watchId) {
      return res.status(400).json({ success: false, error: "Watch ID is required." });
    }

    const index = req.user.wishlist.indexOf(watchId);
    let action = "added";
    if (index > -1) {
      req.user.wishlist.splice(index, 1);
      action = "removed";
    } else {
      req.user.wishlist.push(watchId);
    }

    await req.user.save();

    res.json({
      success: true,
      action,
      wishlist: req.user.wishlist,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
