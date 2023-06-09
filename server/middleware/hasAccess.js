const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        // get token from cookie
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // set userId in req
        req.userId = decoded.id;
        // next
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
