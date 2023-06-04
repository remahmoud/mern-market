const router = require("express").Router();
const authController = require("../controllers/auth");
const hasAccess = require("../middleware/hasAccess");

// me
router.get("/me", hasAccess, authController.whoami);

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.login);

// logout
router.get("/logout", hasAccess, authController.logout);

module.exports = router;
