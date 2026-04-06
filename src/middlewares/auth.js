import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  // El token llega en el header Authorization: Bearer <token>
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // adjunta el usuario al request para usarlo después
    next() // todo bien, continúa al controller
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' })
  }
}