import express from "express";
import { Task } from "../models/Task.js";
import { protect } from "../middleware/auth.js";
import { validateTask } from "../middleware/validate.js";

const router = express.Router();

// Apply auth protection to all task routes
router.use(protect);

// @desc    Create a new task / concierge request
// @route   POST /api/tasks
// @access  Private
router.post("/", validateTask, async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      category,
      watchId,
      watchName,
      location,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status: status || "pending",
      priority: priority || "medium",
      category: category || "concierge",
      watchId: watchId || "",
      watchName: watchName || "",
      location: location || "Mumbai BKC Flagship Suite",
      dueDate: dueDate || null,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Horological task / concierge request created successfully.",
      data: task,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Retrieve all tasks for current collector (or all tasks for admin)
// @route   GET /api/tasks
// @access  Private
router.get("/", async (req, res, next) => {
  try {
    const filter = {};

    // Non-admin collectors only view their own tasks
    if (req.user.role !== "admin" && req.user.role !== "salon_director") {
      filter.user = req.user._id;
    }

    // Optional query filters
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.search) {
      const term = req.query.search.trim();
      filter.$or = [
        { title: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
        { watchName: { $regex: term, $options: "i" } },
      ];
    }

    const sortOption = req.query.sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const tasks = await Task.find(filter)
      .sort(sortOption)
      .populate("user", "name email role");

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Retrieve a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate("user", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with ID ${req.params.id} not found.`,
      });
    }

    // Ensure the collector owns this task (or is admin/salon director)
    if (
      task.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      req.user.role !== "salon_director"
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to access this task.",
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Private
router.put("/:id", async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with ID ${req.params.id} not found.`,
      });
    }

    // Ensure ownership or admin rights
    if (
      task.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      req.user.role !== "salon_director"
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this task.",
      });
    }

    const fieldsToUpdate = {};
    if (req.body.title) fieldsToUpdate.title = req.body.title.trim();
    if (req.body.description) fieldsToUpdate.description = req.body.description.trim();
    if (req.body.status) fieldsToUpdate.status = req.body.status;
    if (req.body.priority) fieldsToUpdate.priority = req.body.priority;
    if (req.body.category) fieldsToUpdate.category = req.body.category;
    if (req.body.watchId !== undefined) fieldsToUpdate.watchId = req.body.watchId;
    if (req.body.watchName !== undefined) fieldsToUpdate.watchName = req.body.watchName;
    if (req.body.location !== undefined) fieldsToUpdate.location = req.body.location;
    if (req.body.dueDate !== undefined) fieldsToUpdate.dueDate = req.body.dueDate;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with ID ${req.params.id} not found.`,
      });
    }

    // Ensure ownership or admin rights
    if (
      task.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      req.user.role !== "salon_director"
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to delete this task.",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Task removed successfully.",
      data: {},
    });
  } catch (err) {
    next(err);
  }
});

export default router;
