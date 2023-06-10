const User = require("../models/user.model");
const Product = require("../models/product.model");

// @desc    Get users
// @route   GET /api/dashboard/users
exports.getUsers = async (req, res) => {
    try {
        // get users
        const users = await User.find().limit(10).sort({ createdAt: -1 });
        // send response
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get user
// @route   GET /api/dashboard/users/:id
exports.getUser = async (req, res) => {
    try {
        // get user
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // send response
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Create user
// @route   POST /api/dashboard/users
exports.createUser = async (req, res) => {
    try {
        // check email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // create user
        user = await User.create(req.body);
        // send response
        return res.status(201).json({ message: "Create user success" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/dashboard/users/:id
exports.updateUser = async (req, res) => {
    try {
        // get user
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // update user
        const { name, email, isAdmin } = req.body;
        user.name = name;
        user.email = email;
        user.isAdmin = isAdmin;
        await user.save();
        // send response
        return res.status(200).json({ message: "Update user success" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/dashboard/users/:id
exports.deleteUser = async (req, res) => {
    try {
        // get user
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // delete user
        await user.deleteOne();
        // send response
        return res.status(200).json({ message: "Delete user success" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get products
// @route   GET /api/dashboard/products
exports.getProducts = async (req, res) => {
    try {
        // get products
        const products = await Product.find()
            .limit(10)
            .sort({ createdAt: -1 })
            .populate("user", "name email");
        // send response
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get product
// @route   GET /api/dashboard/products/:id
exports.getProduct = async (req, res) => {
    try {
        // get product
        const product = await Product.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if (!product) {
            return res.status(400).json({ message: "Product does not exist" });
        }
        // send response
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Create product
// @route   POST /api/dashboard/products
exports.createProduct = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // create product
        const product = await Product.create({ ...req.body, user: user._id });
        // send response
        return res.status(201).json({ message: "Create product success" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/dashboard/products/:id
exports.updateProduct = async (req, res) => {
    try {
        // get product
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "Product does not exist" });
        }
        // update product
        const { name, price, image, category, quantity, description } =
            req.body;
        product.name = name;
        product.price = price;
        product.image = image;
        product.category = category;
        product.quantity = quantity;
        product.description = description;
        await product.save();
        // send response
        return res.status(200).json({ message: "Update product success" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/dashboard/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        // get product
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "Product does not exist" });
        }
        // delete product
        await product.deleteOne();
        // send response
        return res.status(200).json({ message: "Delete product success" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
