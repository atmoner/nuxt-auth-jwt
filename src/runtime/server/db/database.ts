import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'node:path'
import type { User } from '../../types/auth'

// Structure de la base de données
interface DatabaseSchema {
  users: (User & { password: string })[]
  refreshTokens: string[]
}

// Chemin vers le fichier de base de données
const dbPath = join(process.cwd(), 'data', 'db.json')

// Créer l'adaptateur et l'instance de base de données
const adapter = new JSONFile<DatabaseSchema>(dbPath)
const db = new Low(adapter, { users: [], refreshTokens: [] })

// Initialiser la base de données
export async function initDatabase(): Promise<void> {
  await db.read()

  // Si le fichier n'existe pas, créer la structure par défaut
  if (!db.data) {
    db.data = { users: [], refreshTokens: [] }
    await db.write()
  }
}

// Exporter l'instance de base de données
export { db }
export type { DatabaseSchema }
