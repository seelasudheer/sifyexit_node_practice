const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const products = new Schema(
  {
    itemName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    itemDescription: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String },
    category: { type: String },
  },
  {
    // timestamps: true
    versionKey: false,
  }
);
const productsSchema = mongoose.model("sampleproducts", products);

module.exports = productsSchema;
