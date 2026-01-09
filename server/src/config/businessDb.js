import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDir = path.join(__dirname, '../../database');
const businessPath = path.join(dbDir, 'business.db');
const usersPath = path.join(dbDir, 'users.db');

// Create database directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Created database directory: ${dbDir}`);
}
console.log(`Database location: ${businessPath}`);

const businessDb = new DatabaseSync(businessPath);
const usersDb = new DatabaseSync(usersPath);
businessDb.exec(
  `CREATE TABLE IF NOT EXISTS businesses(
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL
  )`
);
usersDb.exec(
    `CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at INTEGER NOT NULL
    )`
  );
export default { businessDb, usersDb };