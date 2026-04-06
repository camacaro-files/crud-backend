import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' })
const prisma = new PrismaClient({ adapter })

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está registrado' })
    }

    // Encriptar la contraseña — el 10 es el número de "rounds" de encriptación
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    })

    res.status(201).json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    })
  } catch (error) {
  console.error('Error en register:', error)
  res.status(500).json({ error: error.message })
}
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Buscar el usuario
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Comparar la contraseña con el hash guardado
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Generar el token JWT — expira en 24 horas
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token })
  } catch (error) {
  console.error('Error en login:', error)
  res.status(500).json({ error: error.message })
}
}