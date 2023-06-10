const router = require("express").Router();
const productController = require("../controllers/product");
const hasAccess = require("../middleware/hasAccess");
const upload = require("../middleware/upload");

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

// upload a product image
router.post(
    "/upload",
    hasAccess,
    upload.single("image"),
    productController.uploadImage
);

module.exports = router;
