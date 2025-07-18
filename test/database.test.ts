import { describe, it, expect } from 'vitest'
import {
  createUser,
  findUserByEmail,
  verifyCredentials,
  getAllUsers,
  addRefreshToken,
  removeRefreshToken,
  isValidRefreshToken,
} from '../src/runtime/server/services/user'

describe('UserService with LowDB', () => {
  it('should create a user and persist it to database', async () => {
    const credentials = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    }

    const user = await createUser(credentials)

    expect(user).toBeDefined()
    expect(user.email).toBe(credentials.email)
    expect(user.username).toBe(credentials.username)
    expect(user.id).toBeDefined()
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
    // Password should not be returned
    expect('password' in user).toBe(false)
  })

  it('should find user by email', async () => {
    const user = await findUserByEmail('test@example.com')

    expect(user).toBeDefined()
    expect(user?.email).toBe('test@example.com')
    expect(user?.username).toBe('testuser')
    // Password should be included in this method
    expect(user?.password).toBeDefined()
  })

  it('should verify credentials', async () => {
    const user = await verifyCredentials('test@example.com', 'password123')

    expect(user).toBeDefined()
    expect(user?.email).toBe('test@example.com')
    // Password should not be returned
    expect('password' in user!).toBe(false)
  })

  it('should get all users', async () => {
    const users = await getAllUsers()

    expect(users).toBeDefined()
    expect(Array.isArray(users)).toBe(true)
    expect(users.length).toBeGreaterThan(0)

    // Verify that no user contains password
    users.forEach((user) => {
      expect('password' in user).toBe(false)
    })
  })

  it('should manage refresh tokens', async () => {
    const token = 'test-refresh-token-123'

    // Add a token
    await addRefreshToken(token)

    // Verify it is valid
    const isValid = await isValidRefreshToken(token)
    expect(isValid).toBe(true)

    // Remove the token
    await removeRefreshToken(token)

    // Verify it is no longer valid
    const isStillValid = await isValidRefreshToken(token)
    expect(isStillValid).toBe(false)
  })
})
