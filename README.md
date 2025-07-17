# Nuxt Auth JWT

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

A complete authentication module for Nuxt 4 with JWT tokens and persistent database support via LowDB.

## ✨ Features

- 🔐 **Complete Authentication System** : Login, Register, Logout
- 🔄 **JWT & Refresh Tokens** : Automatic token refresh management
- 🗄️ **Persistent Database** : Uses LowDB for JSON storage
- 🛡️ **Security** : Password hashing with bcrypt
- 🚀 **Automatic Middleware** : Route protection for authenticated pages
- 📝 **TypeScript** : Full TypeScript support with defined types
- 🔧 **Easy Integration** : Drop-in solution with minimal configuration
- � **Auto Logout** : Automatic logout on token expiration

## Quick Setup

Install the module to your Nuxt application:

```bash
npx nuxi module add @cosmdev/nuxt-auth-jwt
```

That's it! You can now use Nuxt offlinesigners Module in your Nuxt app ✨

## Manual Setup

Install the module to your Nuxt application:

```bash
npm install nuxt-auth-jwt
```

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-auth-jwt'
  ]
})
```

That's it! The module will automatically set up all authentication routes and middleware. ✨

## 🗄️ Database

This module uses **LowDB** as a lightweight and persistent JSON database stored in `data/db.json`.

### Database Schema

```json
{
  "users": [
    {
      "id": "user_1234567890_abc123",
      "email": "user@example.com", 
      "username": "username",
      "password": "$2b$10$hashedpassword...",
      "createdAt": "2025-01-17T10:00:00.000Z",
      "updatedAt": "2025-01-17T10:00:00.000Z"
    }
  ],
  "refreshTokens": ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."]
}
```

### LowDB Advantages

- ✅ **Zero Configuration** : No database server setup required
- ✅ **Rapid Development** : Perfect for prototyping and small apps
- ✅ **Portability** : Database in a simple JSON file
- ✅ **Performance** : Sufficient for small to medium applications
- ✅ **Inspectable** : Data easily readable and debuggable

### Migration to Production Database

To switch to PostgreSQL, MySQL, etc., simply modify the `src/runtime/server/db/database.ts` file to use an ORM like Prisma or Drizzle. The service interfaces remain identical.

## 🚀 Usage

### Basic Authentication

The module provides a simple authentication API through the `useAuth()` composable:

```vue
<template>
  <div>
    <div v-if="$auth.isAuthenticated">
      <h1>Welcome {{ $auth.currentUser?.username }}!</h1>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
const { $auth } = useNuxtApp()

const logout = async () => {
  await $auth.logout()
  await navigateTo('/login')
}
</script>
```

### Login Component

```vue
<template>
  <form @submit.prevent="handleLogin">
    <input 
      v-model="credentials.email" 
      type="email" 
      placeholder="Email" 
      required 
    />
    <input 
      v-model="credentials.password" 
      type="password" 
      placeholder="Password" 
      required 
    />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>

<script setup>
const { $auth } = useNuxtApp()

const credentials = reactive({
  email: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await $auth.login(credentials)
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

### Registration Component

```vue
<template>
  <form @submit.prevent="handleRegister">
    <input 
      v-model="credentials.email" 
      type="email" 
      placeholder="Email" 
      required 
    />
    <input 
      v-model="credentials.username" 
      type="text" 
      placeholder="Username" 
      required 
    />
    <input 
      v-model="credentials.password" 
      type="password" 
      placeholder="Password" 
      required 
    />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Creating account...' : 'Register' }}
    </button>
  </form>
</template>

<script setup>
const { $auth } = useNuxtApp()

const credentials = reactive({
  email: '',
  username: '',
  password: ''
})

const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  try {
    await $auth.register(credentials)
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

### Route Protection

Create protected pages by using the built-in middleware. Create a `middleware/auth.ts` file:

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp()
  
  if (!$auth.isAuthenticated) {
    return navigateTo('/login')
  }
})
```

Then use it in your pages:

```vue
<template>
  <div>
    <h1>Protected Dashboard</h1>
    <p>Hello {{ $auth.currentUser?.username }}!</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { $auth } = useNuxtApp()
</script>
```

### Making Authenticated API Calls

For protected API routes, use the `authenticatedFetch` method:

```vue
<script setup>
const { $auth } = useNuxtApp()

const fetchUserData = async () => {
  try {
    const data = await $auth.authenticatedFetch('/api/protected/users')
    console.log('Protected data:', data)
  } catch (error) {
    console.error('Failed to fetch protected data:', error)
  }
}
</script>
```

## 📡 API Endpoints

The module automatically provides these API endpoints:

### Authentication Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get current user profile

### Example API Usage

#### Login Request

```typescript
const response = await $fetch('/api/auth/login', {
  method: 'POST',
  body: {
    email: 'user@example.com',
    password: 'password123'
  }
})

// Response:
// {
//   user: { id, email, username, createdAt, updatedAt },
//   tokens: { accessToken, refreshToken }
// }
```

#### Protected Route Example

```typescript
// server/api/protected/users.get.ts
export default defineEventHandler(async (event) => {
  // Middleware automatically handles authentication
  const user = event.context.user // Current authenticated user
  
  return { users: [] } // Your protected data
})
```

## 🔧 Composables API

### useAuth()

The main authentication composable provides:

```typescript
interface AuthAPI {
  // Methods
  login(credentials: LoginCredentials): Promise<AuthResponse>
  register(credentials: RegisterCredentials): Promise<AuthResponse>
  logout(): Promise<void>
  refreshTokens(): Promise<AuthTokens>
  getProfile(): Promise<User>
  authenticatedFetch(url: string, options?: any): Promise<any>
  
  // Properties
  isAuthenticated: boolean
  currentUser: User | null
}
```

### Types

```typescript
interface User {
  id: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  email: string
  username: string
  password: string
}

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

interface AuthResponse {
  user: User
  tokens: AuthTokens
}
```

## 🛡️ Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Access tokens expire in 15 minutes
- **Refresh Tokens**: Long-lived refresh tokens (30 days)
- **Automatic Refresh**: Transparent token refresh on API calls
- **Secure Cookies**: HTTPOnly cookies in production
- **Auto Logout**: Automatic logout on token expiration

## ⚙️ Configuration

The module works out of the box with sensible defaults. For custom configuration, you can extend the module options:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-auth-jwt'],
  auth: {
    // Custom configuration options will be available in future versions
  }
})
```

## 🧪 Testing

The module includes comprehensive tests:

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run test:types
```

## 📝 Examples

Check out the `playground/` directory for complete working examples including:

- Login/Register forms
- Protected dashboard
- User profile management
- API integration examples

## 🔄 Migration from Other Auth Modules

### From @nuxtjs/auth-next

Replace your auth configuration:

```diff
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
-   '@nuxtjs/auth-next'
+   'nuxt-auth-jwt'
  ],
-  auth: {
-    strategies: { ... }
-  }
})
```

Update your components:

```diff
- const { $auth } = useContext()
+ const { $auth } = useNuxtApp()

- $auth.loggedIn
+ $auth.isAuthenticated

- $auth.user
+ $auth.currentUser
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines:

<details>
  <summary>Local Development Setup</summary>
  
  ```bash
  # Clone the repository
  git clone https://github.com/atmoner/nuxt-auth-jwt.git
  cd nuxt-auth-jwt
  
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Start development with playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run linting
  npm run lint
  
  # Run tests
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

## Publishing & Deployment

This module uses automated GitHub Actions workflows for testing and publishing.

### Automated Publishing

The package is automatically published to NPM when you create a new git tag:

```bash
# Update version and create tag
npm version patch  # or minor/major
git push origin main --tags
```

### Manual Publishing

You can also manually trigger publishing from GitHub Actions:

1. Go to the "Actions" tab in the GitHub repository
2. Select "Publish to NPM" workflow  
3. Click "Run workflow"

For detailed publishing instructions, see [PUBLISHING.md](PUBLISHING.md).

### CI/CD Pipeline

- ✅ **Continuous Integration**: Tests run on Node.js 18, 20, and 22
- ✅ **Automated Testing**: Linting, tests, and type checking
- ✅ **Automated Publishing**: NPM publication on git tags
- ✅ **GitHub Releases**: Automatic release creation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Built with ❤️ using:
- [Nuxt](https://nuxt.com/) - The intuitive Vue framework
- [LowDB](https://github.com/typicode/lowdb) - Simple JSON database
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWT implementation

---

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-auth-jwt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-auth-jwt

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-auth-jwt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-auth-jwt
