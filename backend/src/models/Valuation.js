import mongoose from "mongoose";

const valuationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      default: "2022",
    },
    condition: {
      type: String,
      enum: ["mint", "excellent", "good"],
      default: "mint",
    },
    hasBox: {
      type: Boolean,
      default: true,
    },
    hasPapers: {
      type: Boolean,
      default: true,
    },
    estimatedMin: {
      type: Number,
      required: true,
    },
    estimatedMax: {
      type: Number,
      required: true,
    },
    beneficiaryName: {
      type: String,
      required: true,
    },
    beneficiaryPhone: {
      type: String,
      required: true,
    },
    beneficiaryCity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "dossier_received",
        "assessment_pending",
        "wire_approved",
        "payout_completed",
      ],
      default: "dossier_received",
    },
  },
  {
    timestamps: true,
  }
);

export const Valuation = mongoose.model("Valuation", valuationSchema);
