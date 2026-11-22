import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    escrowRef: {
      type: String,
      required: true,
      unique: true,
    },
    collectorName: {
      type: String,
      required: true,
    },
    collectorEmail: {
      type: String,
    },
    collectorPhone: {
      type: String,
    },
    items: [
      {
        watchId: { type: String, required: true },
        name: { type: String, required: true },
        reference: { type: String, required: true },
        quantity: { type: Number, default: 1, min: 1 },
        selectedStrap: { type: String, default: "default" },
        selectedDial: { type: String, default: "default" },
        unitPrice: { type: Number, required: true },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      city: { type: String, required: true },
      address: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    status: {
      type: String,
      enum: [
        "escrow_initialized",
        "vault_locked",
        "armored_transit",
        "handover_completed",
        "cancelled",
      ],
      default: "escrow_initialized",
    },
    escrowInstitution: {
      type: String,
      default: "ICICI Private Banking & Geneva Custody",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
