import { defineEventHandler } from 'h3'
import { getAllUsers } from '../../services/user'

export default defineEventHandler(async (event) => {
  // User is automatically verified by auth middleware
  const currentUser = event.context.user

  // Example: get all users (only for logged users)
  const allUsers = await getAllUsers()

  return {
    message: `Hello ${currentUser.username}! Here are all users:`,
    currentUser,
    allUsers,
    timestamp: new Date().toISOString(),
  }
})
