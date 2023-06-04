const User = require("../models/user.model");

// @desc    Get user
// @route   GET /api/auth/me
// @access  Private
exports.whoami = async (req, res) => {
    try {
        // get user
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        // send response
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// @desc    Register
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        // create new user
        const newUser = await User.create({ name, email, password });
        // create token
        const token = newUser.generateToken();
        // send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        });
        // send response
        return res.status(200).json({
            msg: "Register success!",
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// @desc    Login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        // check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        // create token
        const token = user.generateToken();

        // send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        });

        // send response
        return res.status(200).json({
            msg: "Login success!",
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// @desc    Logout
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    try {
        // send response
        res.clearCookie("token");
        return res.status(200).json({
            msg: "Logout success!",
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};