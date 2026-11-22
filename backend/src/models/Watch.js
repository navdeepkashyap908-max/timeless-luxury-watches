import mongoose from "mongoose";

const watchSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Watch unique slug ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Watch model name is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    maison: {
      type: String,
      default: "Manufacture Le Locle",
    },
    category: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    subtitle: {
      type: String,
      default: "",
    },
    fullDescription: {
      type: String,
      default: "",
    },
    reference: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    discountBadge: {
      type: String,
      default: null,
    },
    privilegeBadge: {
      type: String,
      default: null,
    },
    statusBadge: {
      type: String,
      default: "In Stock",
    },
    tag: {
      type: String,
      default: "Swiss Certified",
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    stockCount: {
      type: Number,
      default: 2,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
    },
    gallery: [
      {
        title: String,
        src: String,
        alt: String,
      },
    ],
    specs: {
      metallurgy: String,
      dimensions: String,
      crystal: String,
      dial: String,
      escapement: String,
      powerReserve: String,
      waterTightness: String,
      chronometry: String,
      calibre: String,
      frequency: String,
      diameter: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Watch = mongoose.model("Watch", watchSchema);
