const express = require("express");
const authRoute = require("./adminRoutes/authRoute");
const restaurantRoute = require("./adminRoutes/restaurantRoute");
const menuRoute = require("./adminRoutes/menuRoute");
const dishRoute = require("./adminRoutes/dishRoute");
const publicOrderRoute = require("./clientRoutes/orderRoute");
const publicRestaurantRoute = require("./clientRoutes/restaurantRoute");
const publicMenuRoute = require("./clientRoutes/menuRoute");
const orderRoute = require("./adminRoutes/orderRoute")


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
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/public/order", publicOrderRoute);
app.use("/api/v1/public/restaurant", publicRestaurantRoute)
app.use("/api/v1/public/menu", publicMenuRoute)

module.exports = app;
