export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      error: "Please provide your full collector name.",
    });
  }

  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address.",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      error: "Password must be at least 6 characters in length.",
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide both email address and password.",
    });
  }

  next();
};

export const validateTask = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: "Task title is required.",
    });
  }

  if (!description || !description.trim()) {
    return res.status(400).json({
      success: false,
      error: "Task description is required.",
    });
  }

  if (req.body.priority) {
    const validPriorities = ["low", "medium", "high", "urgent"];
    if (!validPriorities.includes(req.body.priority)) {
      return res.status(400).json({
        success: false,
        error: `Invalid priority. Must be one of: ${validPriorities.join(", ")}`,
      });
    }
  }

  if (req.body.status) {
    const validStatuses = ["pending", "in_progress", "completed", "archived"];
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }
  }

  next();
};
