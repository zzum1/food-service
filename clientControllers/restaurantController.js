const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRestaurantById = async (req, res) => {

    const { id } = req.params;

    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if(!restaurant){
            return res.status(404).json({message: "No restaurant was found"})
        }
        res.status(200).json(restaurant)

    } catch (error) {
        res.status(500).json({message: "Server Error :D"})
    }
}

module.exports = {
    getRestaurantById,
}