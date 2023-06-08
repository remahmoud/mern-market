const router = require("express").Router();
const controller = require("../controllers/dashboard");
const isAdmin = require("../middleware/isAdmin");
const hasAccess = require("../middleware/hasAccess");

router.get("/users", hasAccess, isAdmin, controller.getUsers);
router.get("/users/:id", hasAccess, isAdmin, controller.getUser);
router.put("/users/:id", hasAccess, isAdmin, controller.updateUser);
router.delete("/users/:id", hasAccess, isAdmin, controller.deleteUser);

module.exports = router;
