import { Router } from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.js'
import { verifyToken } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createProductSchema, updateProductSchema } from '../validators/product.js'

const router = Router()

// Todas las rutas de productos requieren token válido
router.get('/', verifyToken, getAllProducts)
router.get('/:id', verifyToken, getProductById)
router.post('/', verifyToken, validate(createProductSchema), createProduct)
router.put('/:id', verifyToken, validate(updateProductSchema), updateProduct)
router.delete('/:id', verifyToken, deleteProduct)

export default router