const mongoose = require("mongoose");

// Define Material Schema
const materialSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    carbonFootprint: { type: Number, default: 1.000, required: false } 
});

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }]
}, { timestamps: true });

  

// Define Material Model
const Material = mongoose.model('Material', materialSchema);

// Define Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Material };
