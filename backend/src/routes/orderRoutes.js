import express from "express";
import { Order } from "../models/Order.js";
import { optionalAuth, protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Create an Escrow Custody Order
// @route   POST /api/orders
// @access  Public / Optional Auth
router.post("/", optionalAuth, async (req, res, next) => {
  try {
    const {
      items,
      subtotal,
      totalAmount,
      deliveryAddress,
      deliveryCity,
      address,
      pincode,
      collectorName,
      collectorEmail,
      collectorPhone,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one timepiece item is required to initialize escrow.",
      });
    }

    // Support both nested deliveryAddress and flat city/address/pincode
    const resolvedAddress = {
      city: deliveryAddress?.city || deliveryCity || "Mumbai",
      address: deliveryAddress?.address || address || "Private Residence",
      pincode: deliveryAddress?.pincode || pincode || "400001",
    };

    if (!resolvedAddress.city || !resolvedAddress.address) {
      return res.status(400).json({
        success: false,
        error: "Complete delivery address including city is required.",
      });
    }

    // Normalize items
    const normalizedItems = items.map((item) => ({
      watchId: item.watchId || "watch-ref",
      name: item.name || "Haute Horlogerie Timepiece",
      reference: item.reference || `REF-${(item.watchId || "TL").toUpperCase()}`,
      quantity: item.quantity || 1,
      selectedStrap: item.selectedStrap || item.strap || "default",
      selectedDial: item.selectedDial || item.dial || "default",
      unitPrice: item.unitPrice || item.price || 0,
    }));

    const computedSubtotal =
      subtotal ||
      totalAmount ||
      normalizedItems.reduce((acc, i) => acc + (i.unitPrice || 0) * (i.quantity || 1), 0);

    const escrowRef = "TL-ESCROW-" + Math.floor(100000 + Math.random() * 900000);

    const order = await Order.create({
      user: req.user ? req.user._id : null,
      escrowRef,
      collectorName: collectorName || (req.user ? req.user.name : "Connoisseur Collector"),
      collectorEmail: collectorEmail || (req.user ? req.user.email : ""),
      collectorPhone: collectorPhone || (req.user ? req.user.phone : ""),
      items: normalizedItems,
      subtotal: computedSubtotal,
      deliveryAddress: resolvedAddress,
      status: "escrow_initialized",
    });

    const responsePayload = {
      ...order.toObject(),
      referenceNumber: order.escrowRef,
    };

    res.status(201).json({
      success: true,
      message: `Escrow Deed ${escrowRef} registered with ICICI Private Banking.`,
      data: responsePayload,
      order: responsePayload,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get all orders for authenticated collector
// @route   GET /api/orders
// @access  Private
router.get("/", protect, async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role !== "admin" && req.user.role !== "salon_director") {
      filter.user = req.user._id;
    }

    const orders = await Order.find(filter).sort("-createdAt");

    res.json({
      success: true,
      count: orders.length,
      data: orders,
      orders,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get single order by ID or Escrow Reference
// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", protect, async (req, res, next) => {
  try {
    let order;
    if (req.params.id.startsWith("TL-ESCROW-")) {
      order = await Order.findOne({ escrowRef: req.params.id });
    } else {
      order = await Order.findById(req.params.id);
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Escrow custody deed record not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      req.user.role !== "salon_director" &&
      order.user &&
      order.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to review this private custody deed.",
      });
    }

    res.json({
      success: true,
      data: order,
      order,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
