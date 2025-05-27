const express = require("express");
const {
  createDish,
  updateDish,
  deleteDish,
} = require("../adminControllers/dishController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createDish);
router.patch("/:id", auth, updateDish);
router.delete("/:id", auth, deleteDish);

module.exports = router;
