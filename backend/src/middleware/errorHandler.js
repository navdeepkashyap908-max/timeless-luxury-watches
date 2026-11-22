export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(`[Error Handler] ${req.method} ${req.url}:`, err);

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with identifier of ${err.value}`;
    return res.status(404).json({ success: false, error: message });
  }

  // Mongoose Duplicate Key (11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const message = `Duplicate value entered for ${field}. An account with this ${field} already exists.`;
    return res.status(400).json({ success: false, error: message });
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message).join(", ");
    return res.status(400).json({ success: false, error: message });
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, error: "Invalid authentication token signature." });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, error: "Authentication token has expired. Please log in again." });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Haute Horlogerie Server Error",
  });
};
