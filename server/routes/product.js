const router = require("express").Router();
const productController = require("../controllers/product");
const hasAccess = require("../middleware/hasAccess");

// get all products
router.get("/", productController.getProducts);

// get a product
router.get("/:id", productController.getProduct);

// create a product
router.post("/create", hasAccess, productController.createProduct);

// update a product
router.put("/:id", hasAccess, productController.updateProduct);

// delete a product
router.delete("/:id", hasAccess, productController.deleteProduct);

module.exports = router;
