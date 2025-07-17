import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { JWTPayload, User } from '../../types/auth'

// Configuration par défaut
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateAccessToken(user: Partial<User>): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id!,
    email: user.email!,
    username: user.username!,
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions)
}

export function generateRefreshToken(user: Partial<User>): string {
  const payload = {
    userId: user.id!,
    type: 'refresh',
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  } as jwt.SignOptions)
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  }
  catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export function verifyRefreshToken(token: string): { userId: string, type: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, type: string, iat: number, exp: number }
    if (decoded.type !== 'refresh') {
      return null
    }
    return decoded
  }
  catch (error) {
    console.error('Refresh token verification failed:', error)
    return null
  }
}

export function extractTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}
