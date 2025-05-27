const express = require("express");
const { createOrder } = require("../clientControllers/orderController");

const router = express.Router();

router.post("/", createOrder);

module.exports = router;
