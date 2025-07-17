import type { User, RegisterCredentials } from '../../types/auth'
import { hashPassword, verifyPassword } from '../utils/auth'
import { db, initDatabase } from '../db/database'

// Initialiser la base de données au démarrage
let dbInitialized = false
async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initDatabase()
    dbInitialized = true
  }
}

export async function createUser(credentials: RegisterCredentials): Promise<User> {
  await ensureDbInitialized()
  await db.read()

  // Check if user already exists
  const existingUser = db.data!.users.find(
    user => user.email === credentials.email || user.username === credentials.username,
  )

  if (existingUser) {
    throw new Error('User already exists with this email or username')
  }

  // Hash the password
  const hashedPassword = await hashPassword(credentials.password)

  // Create the user
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const now = new Date()

  const newUser = {
    id: userId,
    email: credentials.email,
    username: credentials.username,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  }

  db.data!.users.push(newUser)
  await db.write()

  // Return user without password
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

export async function findUserByEmail(email: string): Promise<(User & { password: string }) | null> {
  await ensureDbInitialized()
  await db.read()

  const user = db.data!.users.find(user => user.email === email)
  return user || null
}

export async function findUserById(id: string): Promise<User | null> {
  await ensureDbInitialized()
  await db.read()

  const user = db.data!.users.find(user => user.id === id)
  if (!user) return null

  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email)
  if (!user) return null

  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) return null

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function addRefreshToken(token: string): Promise<void> {
  await ensureDbInitialized()
  await db.read()

  if (!db.data!.refreshTokens.includes(token)) {
    db.data!.refreshTokens.push(token)
    await db.write()
  }
}

export async function removeRefreshToken(token: string): Promise<void> {
  await ensureDbInitialized()
  await db.read()

  const index = db.data!.refreshTokens.indexOf(token)
  if (index > -1) {
    db.data!.refreshTokens.splice(index, 1)
    await db.write()
  }
}

export async function isValidRefreshToken(token: string): Promise<boolean> {
  await ensureDbInitialized()
  await db.read()

  return db.data!.refreshTokens.includes(token)
}

export async function getAllUsers(): Promise<User[]> {
  await ensureDbInitialized()
  await db.read()

  return db.data!.users.map(({ password, ...user }) => user)
}
