const router = require("express").Router();
const authController = require("../controllers/auth");
const hasAccess = require("../middleware/hasAccess");
const isValid = require("../middleware/isValid");
const { register, login } = require("../models/schema");

// me
router.get("/me", hasAccess, authController.whoami);

// register
router.post("/register", isValid(register), authController.register);

// login
router.post("/login", isValid(login), authController.login);

// logout
router.get("/logout", hasAccess, authController.logout);

module.exports = router;
