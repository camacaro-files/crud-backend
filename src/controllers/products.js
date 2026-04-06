import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// GET /api/products → obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

// GET /api/products/:id → obtener un producto por id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    })
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' })
  }
}

// POST /api/products → crear un producto nuevo
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body
    const product = await prisma.product.create({
      data: { name, description, price, stock }
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' })
  }
}

// PUT /api/products/:id → actualizar un producto existente
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, stock } = req.body
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, stock }
    })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' })
  }
}

// DELETE /api/products/:id → eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.product.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' })
  }
}