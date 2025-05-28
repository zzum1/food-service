const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMenuByRestaurants = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id: parseInt(id)
        },
    })
    if(!restaurant){
        return res.status(404).json({ message: "Restaurant was not found"})
    }
    const menu = await prisma.menu.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!menu) {
      return res.status(404).json({ message: "Restaurant dont have a menu!" });
    }
    res.status(200).json({ message: "Menu was found", menu });
  } catch (error) {
    res.status(500);
  }
};

module.exports = { getMenuByRestaurants };
