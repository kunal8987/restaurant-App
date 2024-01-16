const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant Title Is Required"],
    },
    imageUrl: {
      type: String,
    },
    pickUp: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Restaurant Address Is Required"],
    },
    coordinate: {
      id: { type: String },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      title: { type: String },
    },
    time: {
      type: String,
    },
    foods: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = { RestaurantModel };
