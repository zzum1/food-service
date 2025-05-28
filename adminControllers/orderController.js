const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrders = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const findRestaurant = await prisma.restaurant.findUnique({
      where: {
        id: parseInt(restaurantId),
      },
    });

    if (!findRestaurant) {
      return res.status(404).json({ message: "Restaurant not found!" });
    }
    const order = await prisma.order.findMany({
      where: {
        restaurantId: parseInt(restaurantId),
      },
    });
    res.status(200).json({ message: "Orders", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getOrders,
};
