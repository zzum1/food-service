const express = require("express");
const {
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../adminControllers/menuController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createMenu);
router.patch("/:id", auth, updateMenu);
router.delete("/:id", auth, deleteMenu);

module.exports = router;
