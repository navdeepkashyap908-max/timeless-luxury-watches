import express from "express";
import { Valuation } from "../models/Valuation.js";
import { optionalAuth, protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Submit a pre-owned watch valuation dossier
// @route   POST /api/valuations
// @access  Public / Optional Auth
router.post("/", optionalAuth, async (req, res, next) => {
  try {
    const {
      brand,
      model,
      year,
      condition,
      hasBox,
      hasPapers,
      estimatedMin,
      estimatedMax,
      beneficiaryName,
      beneficiaryPhone,
      beneficiaryCity,
    } = req.body;

    if (!brand || !model || !beneficiaryName || !beneficiaryPhone) {
      return res.status(400).json({
        success: false,
        error: "Maison, model, and beneficiary contact details are required.",
      });
    }

    const referenceId = "TL-VAL-" + Math.floor(100000 + Math.random() * 900000);

    const valuation = await Valuation.create({
      user: req.user ? req.user._id : null,
      referenceId,
      brand,
      model,
      year: year || "2022",
      condition: condition || "mint",
      hasBox: hasBox !== undefined ? hasBox : true,
      hasPapers: hasPapers !== undefined ? hasPapers : true,
      estimatedMin: estimatedMin || 2000000,
      estimatedMax: estimatedMax || 3000000,
      beneficiaryName,
      beneficiaryPhone,
      beneficiaryCity: beneficiaryCity || "Mumbai",
      status: "dossier_received",
    });

    res.status(201).json({
      success: true,
      message: `Valuation Dossier ${referenceId} recorded. Salon Director notified for armored collection.`,
      valuation,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get all valuations for current collector
// @route   GET /api/valuations
// @access  Private
router.get("/", protect, async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role !== "admin" && req.user.role !== "salon_director") {
      filter.user = req.user._id;
    }

    const valuations = await Valuation.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: valuations.length,
      data: valuations,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get single valuation by reference ID
// @route   GET /api/valuations/:id
// @access  Public / Optional Auth
router.get("/:id", optionalAuth, async (req, res, next) => {
  try {
    const valuation = await Valuation.findOne({
      $or: [
        { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
        { referenceId: req.params.id },
      ],
    });

    if (!valuation) {
      return res.status(404).json({
        success: false,
        error: `Valuation with reference ${req.params.id} not found.`,
      });
    }

    res.json({
      success: true,
      data: valuation,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
