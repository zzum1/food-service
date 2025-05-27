const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createRestaurant = async (req, res) => {
  const { title, code, address } = req.body;

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        title,
        code,
        address,
      },
    });
    res
      .status(201)
      .json({ message: "New restaurant was created!", restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating a restaurant", error });
  }
};

const editRestaurant = async (req, res) => {
  const { title, address } = req.body;
  const { id } = req.params;

  try {
    const restaurantById = await prisma.restaurant.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!restaurantById) {
      return res.status(404).json({ message: "Restaurant not found!" });
    }

    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        address,
      },
    });
    res
      .status(201)
      .json({ message: "Restaurant was updated!", updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Something is wrong!" });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const deleteRestaurant = await prisma.restaurant.delete({
      where: {
        id: parseInt(id),
      },
    });
    res
      .status(204)
      .json({ message: "Restaurant was deleted", deleteRestaurant });
  } catch (error) {
    res.status(500).json({ message: "Something is wrong!" });
  }
};

module.exports = {
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
};
