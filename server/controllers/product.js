const Product = require("../models/product.model");
const User = require("../models/user.model");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .limit(10)
            .sort({ createdAt: -1 })
            .populate("user", "name email");

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
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
                message: "Product not found",
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// @desc    Create a product
// @route   POST /api/products/create
// @access  Private
exports.createProduct = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const product = await Product.create({
            ...req.body,
            user: user._id,
        });

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({
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
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        if (product.user.toString() !== user._id.toString()) {
            return res.status(403).json({
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

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        if (product.user.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this product",
            });
        }

        await product.deleteOne();

        return res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// @desc  Upload image for product
// @route POST /api/products/upload
// @access Private

exports.uploadImage = async (req, res) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: "Please upload an image" });
        }
        return res.status(200).json({
            message: "Image uploaded successfully",

            path: "/uploads/" + image.filename,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
