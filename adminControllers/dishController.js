const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createDish = async (req, res) => {
  const { title, description, menuId } = req.body;

  try {
    const newDish = await prisma.dish.create({
      data: {
        description,
        title,
        menuId,
      },
    });
    res.status(201).json({ message: "New dish was created!", newDish });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error while creating a dish", error });
  }
};
const updateDish = async (req, res) => {
  const { description, title } = req.body;
  const { id } = req.params;

  try {
    const dishById = await prisma.dish.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!dishById) {
      return res.status(404).json({ message: "Dish not found!" });
    }

    const updatedDish = await prisma.dish.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description,
        title,
      },
    });
    res.status(201).json({ message: "Dish was updated!", updatedDish });
  } catch (error) {
    res.status(500).json({ message: "Something is wrong!" });
  }
};

const deleteDish = async (req, res) => {
  const { id } = req.params;

  try {
    const dishById = await prisma.dish.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!dishById) {
      return res.status(404).json({ message: "Dish not found!" });
    }

    const deletedDish = await prisma.dish.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Dish was deleted!", deletedDish });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something is wrong!" });
  }
};

module.exports = {
  createDish,
  updateDish,
  deleteDish,
};
