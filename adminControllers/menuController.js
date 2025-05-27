const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMenu = async (req, res) => {
  const { description, restaurantId, dishes } = req.body;

  try {
    const menu = await prisma.menu.create({
      data: {
        description,
        restaurantId,
        dishes: {
            create: dishes.map(dish => ({
                title: dish.title,
                description: dish.description,
            }))
        }
      },
    });
    res.status(201).json({ message: "New menu was created!", menu });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while creating a menu", error });
  }
};

const updateMenu = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  try {
    const menuById = await prisma.menu.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!menuById) {
      res.status(404).json({ message: "Menu not found!" });
    }

    const updatedMenu = await prisma.menu.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description
      },
    });
    res
      .status(201)
      .json({ message: "Menu was updated!", updatedMenu });
  } catch (error) {
    res.status(500).json({ message: "Something is wrong!" });
  }
};

const deleteMenu = async (req, res) => {
    const { id } = req.params;
  
    try {
      const menuById = await prisma.menu.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!menuById) {
        return res.status(404).json({ message: "Menu not found!" });
      }
      // Istriname susijusius irasus su menuId

      await prisma.dish.deleteMany({
        where: {
            menuId: parseInt(id)
        }
      })
  
      const deletedMenu = await prisma.menu.delete({
        where: {
          id: parseInt(id),
        },
      })
      res
        .status(200)
        .json({ message: "Menu was deleted!", deletedMenu });
    } catch (error) {
      res.status(500).json({ message: "Something is wrong!" });
    }
  };

module.exports = {
    createMenu,
    updateMenu,
    deleteMenu,
}