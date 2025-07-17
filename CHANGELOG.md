# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Actions workflow for automated NPM publishing
- CI/CD pipeline with testing on multiple Node.js versions
- Comprehensive test suite for authentication functionality

### Changed
- Improved error handling in authentication endpoints
- Enhanced TypeScript types for better developer experience

### Fixed
- Fixed register function parameter handling in auth plugin
- Resolved ESLint configuration issues

## [1.0.0] - 2025-07-17

### Added
- Complete authentication module for Nuxt 3/4
- JWT-based authentication with access and refresh tokens
- Persistent database support using LowDB
- User registration and login functionality
- Password hashing with bcrypt
- Composable `useAuth()` for easy integration
- Server-side API routes for authentication
- Type-safe TypeScript implementation
- Comprehensive test coverage

### Features
- 🔐 **Secure Authentication**: JWT tokens with configurable expiration
- 💾 **Persistent Storage**: LowDB for user data and refresh token management  
- 🔒 **Password Security**: bcrypt hashing with salt rounds
- 🧪 **Well Tested**: Comprehensive test suite with Vitest
- 📝 **TypeScript**: Full type safety and IntelliSense support
- 🚀 **Easy Setup**: Simple installation and configuration
- 🎨 **Playground**: Example implementation with UI components

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get user profile (authenticated)

### Composables
- `useAuth()` - Main authentication composable with login, register, logout methods
