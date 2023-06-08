const User = require("../models/user.model");

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
        const { name, email, role } = req.body;
        user.name = name;
        user.email = email;
        user.role = role;
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
