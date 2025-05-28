const express = require('express');
const { getMenuByRestaurants } = require('../clientControllers/menuController')

const router = express.Router();

router.get("/:id", getMenuByRestaurants)

module.exports = router;