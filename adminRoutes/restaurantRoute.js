const express = require("express");
const {
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
} = require("../adminControllers/restaurantController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createRestaurant);
router.patch("/:id", auth, editRestaurant);
router.delete("/:id", auth, deleteRestaurant);

module.exports = router;
