import { Product } from "../models/Product";

export const findlist = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
    }
};