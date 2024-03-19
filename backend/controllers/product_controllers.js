const { Product, Material } = require("../models/product_model");

const addProduct = async (req, res, next) => {
    const { name, description, materials } = req.body;

    try {
        // Check if name and description are provided
        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        // Check if any product with the given name exists
        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(400).json({ error: 'Product with the same name already exists' });
        }

        // Array to store the material IDs
        const materialIds = [];

        // Iterate through each material in the materials array
        for (const materialName of materials) {
            // Check if the material exists in the Materials model
            let existingMaterial = await Material.findOne({ name: materialName });

            // If the material doesn't exist, create a new one
            if (!existingMaterial) {
                existingMaterial = new Material({ name: materialName, quantity: 1.000 });
                await existingMaterial.save();
            }

            // Add material ID to the list
            materialIds.push(existingMaterial._id);
        }

        // Now you can create the new product with material IDs
        const newProduct = new Product({ name, description, materials: materialIds });
        await newProduct.save();

        // Return success response
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        // If an error occurs during the database operation, pass it to the error handler middleware
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    const productId = req.query.id; // Corrected to req.params.id
    console.log(productId);
    
    try {
        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        // Check if the product exists
        const product = await Product.findOneAndDelete({ _id: productId });
        
        // If the product doesn't exist, return an error
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return success response
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        // If an error occurs during the database operation, pass it to the error handler middleware
        next(error);
    }
};


const getProducts = async (req, res, next) => {
    const search = req.body.search;

    try {
        let products;

        if (search) {
            // If search term is provided, find products whose names contain the search term
            products = await Product.find({ name: { $regex: search, $options: 'i' } }).populate('materials');
        } else {
            // If no search term is provided, fetch all products
            products = await Product.find().populate('materials');
        }

        // Modify the products to include material names, quantities, and total carbon footprint
        const productsWithMaterialsAndTotalCarbonFootprint = products.map(product => {
            // Extract material names, quantities, and calculate total carbon footprint
            const materials = product.materials.map(material => ({
                name: material.name,
                quantity: material.carbonFootprint
            }));
            const totalCarbonFootprint = product.materials.reduce((total, material) => {
                return total + material.carbonFootprint;
            }, 0);

            // Return a modified product object with materials and total carbon footprint
            return {
                _id: product._id,
                name: product.name,
                description: product.description,
                materials: materials,
                totalCarbonFootprint: totalCarbonFootprint,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            };
        });

        // Return the modified products as JSON response
        res.status(200).json(productsWithMaterialsAndTotalCarbonFootprint);
    } catch (error) {
        // If an error occurs during the database operation, pass it to the error handler middleware
        next(error);
    }
};




const getMaterials = async (req, res, next) => {
    try {
        // Fetch all materials from the database
        const materials = await Material.find();

        // Return the materials as JSON response
        res.status(200).json(materials);
    } catch (error) {
        // If an error occurs during the database operation, pass it to the error handler middleware
        next(error);
    }
};



const editProduct = async (req, res, next) => {
    const productId = req.query.id;
    const { name, description, materials } = req.body;

    try {
        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update product details
        if (name) {
            product.name = name;
        }
        if (description) {
            product.description = description;
        }

        // Update materials if provided
        if (materials && materials.length > 0) {
            product.materials = []; // Clear existing materials
            for (const materialName of materials) {
                let existingMaterial = await Material.findOne({ name: materialName });
                if (!existingMaterial) {
                    existingMaterial = new Material({ name: materialName, quantity: 1.000 });
                    await existingMaterial.save();
                }
                product.materials.push(existingMaterial._id);
            }
        }

        // Save the updated product
        await product.save();

        // Return success response
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        // If an error occurs during the database operation, pass it to the error handler middleware
        next(error);
    }
};

module.exports = { addProduct, deleteProduct, getProducts, editProduct,getMaterials };


