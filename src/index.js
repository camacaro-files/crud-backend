import 'dotenv/config'  // ← debe ser la primera línea
import express from 'express'
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'

const app = express()
const PORT = 3000

// Middleware: le dice a Express que entienda JSON en las peticiones
app.use(express.json())

// Registra las rutas de productos bajo el prefijo /api/products
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: '¡Servidor funcionando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})