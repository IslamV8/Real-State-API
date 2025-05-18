const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
    createProperty,
    getAllProperties,
    getProperty,
    deleteProperty,
    updateProperty,
} = require("../controllers/propertyController");

const { toggleFavorite } = require("../controllers/userController");
router.post("/:id/favorite", auth, toggleFavorite);

router.post("/", auth, upload.array("images"), createProperty);
router.put("/:id", auth, updateProperty);
router.get("/", getAllProperties);
router.get("/:id", getProperty);
router.delete("/:id", auth, deleteProperty);

module.exports = router;