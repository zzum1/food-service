const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await prisma.administrator.findUnique({
      where: {
        email,
      },
    });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already exists" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);

    const administrator = await prisma.administrator.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully", administrator });
  } catch (error) {
    res.status(500).json({ message: "Error creating administrator", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const administrator = await prisma.administrator.findUnique({
      where: {
        email,
      },
    });
    if (!administrator) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, administrator.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: administrator.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = {
  register,
  login,
};