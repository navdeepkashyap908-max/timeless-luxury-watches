import express from "express";
import { Watch } from "../models/Watch.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all watches with optional filtering & sorting
// @route   GET /api/watches
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category && req.query.category !== "all") {
      const cat = req.query.category.toLowerCase();
      filter.$or = [
        { category: { $regex: cat, $options: "i" } },
        { categories: { $in: [new RegExp(cat, "i")] } },
      ];
    }

    if (req.query.search) {
      const term = req.query.search.trim();
      filter.$or = [
        { name: { $regex: term, $options: "i" } },
        { reference: { $regex: term, $options: "i" } },
        { brand: { $regex: term, $options: "i" } },
        { "specs.calibre": { $regex: term, $options: "i" } },
        { "specs.metallurgy": { $regex: term, $options: "i" } },
      ];
    }

    let sort = {};
    if (req.query.sort === "price-asc") {
      sort = { price: 1 };
    } else if (req.query.sort === "price-desc") {
      sort = { price: -1 };
    } else if (req.query.sort === "rating") {
      sort = { rating: -1 };
    } else if (req.query.sort === "popularity") {
      sort = { reviewsCount: -1 };
    } else {
      sort = { createdAt: -1 };
    }

    const watches = await Watch.find(filter).sort(sort);

    res.json({
      success: true,
      count: watches.length,
      data: watches,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get single watch by slug ID or reference
// @route   GET /api/watches/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const watch = await Watch.findOne({
      $or: [{ id: req.params.id }, { reference: req.params.id }],
    });

    if (!watch) {
      return res.status(404).json({
        success: false,
        error: `Watch with identifier '${req.params.id}' not found in Curated Vault.`,
      });
    }

    res.json({
      success: true,
      data: watch,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Create a new timepiece catalog entry
// @route   POST /api/watches
// @access  Private (Admin / Salon Director)
router.post("/", protect, authorize("admin", "salon_director"), async (req, res, next) => {
  try {
    const existing = await Watch.findOne({ id: req.body.id });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: `A timepiece with ID '${req.body.id}' already exists.`,
      });
    }

    const watch = await Watch.create(req.body);

    res.status(201).json({
      success: true,
      message: "Timepiece added to Curated Vault.",
      data: watch,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
