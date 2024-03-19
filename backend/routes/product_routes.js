const express = require("express");
const productRouter = express.Router();

// Import the controller functions
const { addProduct, deleteProduct,getProducts, editProduct,getMaterials } = require('../controllers/product_controllers');

productRouter.post("/add-product", addProduct);
productRouter.post("/delete-product", deleteProduct);
productRouter.post("/get-products", getProducts);
productRouter.post("/edit-product",editProduct);
productRouter.get('/get-materials',getMaterials);


module.exports = productRouter;
