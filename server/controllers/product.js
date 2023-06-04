const Product = require("../models/product.model");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .limit(10)
            .sort({ createdAt: -1 })
            .populate("user", "name email");

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get a product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Create a product
// @route   POST /api/products/create
// @access  Private
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            user: req.userId,
        });

        return res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
    const { name, description, price, quantity, images, category } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.user.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this product",
            });
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.images = images;
        product.category = category;

        await product.save();

        return res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.user.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product",
            });
        }

        await product.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
