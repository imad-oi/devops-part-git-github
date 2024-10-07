const { Product } = require("../models/Product");

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, quantity } = req.body;

        // Check if the product exists by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Optionally, check if the updated name already exists in another product
        if (name) {
            const existingProduct = await Product.findOne({ name });
            if (existingProduct && existingProduct._id.toString() !== id) {
                return res.status(400).json({
                    message: "A product with this name already exists",
                });
            }
        }

        // Update product properties
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;
        product.quantity = quantity || product.quantity;

        // Save the updated product
        await product.save();

        return res.status(200).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error("Error updating product: ", error);
        return res.status(500).json({ error: "Error updating product" });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, quantity } = req.body;

        const product = await Product.findOne({ name });

        if (product) {
            return res.status(400).json({
                message: "Product already exists",
            });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            quantity,
        });

        // Save the product to the database
        await newProduct.save();

        return res.status(201).json({
            message: "Product added",
            product: newProduct,
        });
    } catch (error) {
        console.error("Error creating product: ", error);
        return res.status(500).json({ error: "Error creating product" });
    }
};

const findList = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};

// Delete product API
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the product by ID
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting product: ", error);
        return res.status(500).json({ error: "Error deleting product" });
    }
};

module.exports = { createProduct, updateProduct, findList, deleteProduct };
