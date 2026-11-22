import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route. Bearer token missing.",
    });
  }

  try {
    const secret = process.env.JWT_SECRET || "timeless_jwt_secret_dev_fallback_2026";
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found or token no longer valid.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired authentication token.",
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next();
  }

  try {
    const secret = process.env.JWT_SECRET || "timeless_jwt_secret_dev_fallback_2026";
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
    }
  } catch {
    // Proceed as unauthenticated guest
  }

  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user ? req.user.role : "unauthenticated"}' is not authorized to access this resource.`,
      });
    }
    next();
  };
};
