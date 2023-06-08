const User = require("../models/user.model");

module.exports = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user.isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
