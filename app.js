const express = require("express");
const authRoute = require("./adminRoutes/authRoute");
const restaurantRoute = require("./adminRoutes/restaurantRoute");
const menuRoute = require("./adminRoutes/menuRoute");
const dishRoute = require("./adminRoutes/dishRoute");
const orderRoute = require("./clientRoutes/orderRoute")
const publicRestaurantRoute = require("./clientRoutes/restaurantRoute")

const app = express();
app.use(express.json());

app.use("/", (req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url} is coming!`);
  next();
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/dish", dishRoute);
app.use("/api/v1/public/order", orderRoute);
app.use("/api/v1/public/restaurant", publicRestaurantRoute)

module.exports = app;
