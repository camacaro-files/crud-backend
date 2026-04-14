import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://crud-frontend-pi-five.vercel.app/' // ← tu URL real de Vercel
  ],
  credentials: true
}))

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.json({ message: '¡Servidor funcionando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})