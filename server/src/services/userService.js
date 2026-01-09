import { v4 as uuidv4 } from "uuid";
import {usersDb} from "../config/database.js";

export function getAllUsers() {
    const users = usersDb.prepare(`
        SELECT * FROM users
        `).all();

    return users.map(u => ({
        id: u.id,
        username: u.username,
        password: u.password,
        createdAt: u.created_at
    }));
}

export function createUser(username, password) {
    const userId = uuidv4();
    const createdAt = Date.now();

try {
    usersDb.prepare(
      `INSERT INTO users (id, username, password, created_at)
            VALUES (?, ?, ?, ?)`
    ).run(userId, username, password, createdAt);

    return {
      id: userId,
      username: username,
      createdAt: createdAt
    };
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      console.log(error.message);
      return { error: "Player name already exists", status: 400 };
    }
    throw error;
  }
}
