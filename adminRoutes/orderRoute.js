const express = require("express");
const { getOrders } = require("../adminControllers/orderController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:restaurantId", auth, getOrders);

module.exports = router;
