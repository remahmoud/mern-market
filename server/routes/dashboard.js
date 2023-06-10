const router = require("express").Router();
const controller = require("../controllers/dashboard");
const isAdmin = require("../middleware/isAdmin");
const hasAccess = require("../middleware/hasAccess");
const isValid = require("../middleware/isValid");
const {
    createUser,
    updateUser,
    createProduct,
    updateProduct,
} = require("../models/schema");

// ====================
// User routes
router.get("/users", hasAccess, isAdmin, controller.getUsers);
router.get("/users/:id", hasAccess, isAdmin, controller.getUser);
router.post(
    "/users",
    hasAccess,
    isAdmin,
    isValid(createUser),
    controller.createUser
);
router.put(
    "/users/:id",
    hasAccess,
    isAdmin,
    isValid(updateUser),
    controller.updateUser
);
router.delete("/users/:id", hasAccess, isAdmin, controller.deleteUser);

// ====================
// Product routes
router.get("/products", hasAccess, isAdmin, controller.getProducts);
router.get("/products/:id", hasAccess, isAdmin, controller.getProduct);
router.post(
    "/products",
    hasAccess,
    isAdmin,
    isValid(createProduct),
    controller.createProduct
);
router.put(
    "/products/:id",
    hasAccess,
    isAdmin,
    isValid(updateProduct),
    controller.updateProduct
);
router.delete("/products/:id", hasAccess, isAdmin, controller.deleteProduct);

module.exports = router;
