const express = require("express");
const {
  getRestaurantById,
} = require("../clientControllers/restaurantController");

const router = express.Router();

router.get("/:id", getRestaurantById);

module.exports = router;
