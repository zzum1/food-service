const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    const { title, description, customerName, customerEmail, restaurantId } = req.body;

    try {
        const findRestaurant = await prisma.restaurant.findUnique({
            where: {
                id: parseInt(restaurantId)
            }
        });

        if (!findRestaurant) {
            return res.status(404).json({message: "Restaurant not found!"})
        }

        const newOrder = await prisma.order.create({
            data: {
                title,
                description,
                restaurantId: parseInt(restaurantId),
                customerEmail,
                customerName
            }
        })
        res.status(201).json({message: "Order was created!", newOrder})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error..."})
    }
}

module.exports = {
    createOrder,
}