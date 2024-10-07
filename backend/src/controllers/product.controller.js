
const { Product } = require("../models/Product")


const findList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
  }
};


const createProduct = async (req, res) => {
  try {

    const { name, price, description, category, quantity } = req.body;
    const product = await Product.findOne({ name })

    if (product) {
      return res.status(400).json({
        message: "product already exist"
      })
    }
    // Création du produit
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      quantity,
    });

    // Sauvegarder le produit dans la base de données
    await newProduct.save();

    // Répondre avec succès
    return res.status(201).json({
      message: "Product added",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product :", error);
    return res.status(500).json({ error: "Error creating product" });
  }
};

module.exports = { createProduct, findList }

