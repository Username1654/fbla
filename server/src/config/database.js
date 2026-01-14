import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDir = path.join(__dirname, "../../database");
const businessPath = path.join(dbDir, "business.db");
const usersPath = path.join(dbDir, "users.db");

// Create database directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Created database directory: ${dbDir}`);
}
console.log(`Database location: ${businessPath}`);

export const businessDb = new DatabaseSync(businessPath);
export const usersDb = new DatabaseSync(usersPath);
businessDb.exec(
  `CREATE TABLE IF NOT EXISTS businesses(
  business_id TEXT PRIMARY KEY,
  business_name TEXT UNIQUE NOT NULL,
  description TEXT,
  business_type TEXT,
  created_at INTEGER NOT NULL
  )`
);

businessDb.exec(
  `CREATE TABLE IF NOT EXISTS reviews(
  review_id TEXT PRIMARY KEY,
  business_id TEXT,
  review_user TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id)
)`
);

businessDb.exec(
  `CREATE TABLE IF NOT EXISTS photos (
  photo_id TEXT PRIMARY KEY,
    business_id TEXT,
  filename TEXT NOT NULL,
  original_name TEXT,
  path TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id)
)`
);

usersDb.exec(
  `CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at INTEGER NOT NULL
    )`
);

export default { businessDb, usersDb };
