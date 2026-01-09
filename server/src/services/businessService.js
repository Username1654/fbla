import { v4 as uuidv4 } from "uuid";
import businessDb from "../config/database.js";

export function createUser(name, password) {
    const userId = uuidv4();
    const createdAt = Date.now();

    try {
        businessDb.prepare(
            `
            INSERT INTO players (id, name, password, created_at) VALUES (?, ?, ?, ?)
            `
        ).run(userId, name, password, createdAt);
        return {
            id: userId,
            name,
            password,
            createdAt
        }
    } catch (error) {
        if (error.message.includes("UNIQUE constraint failed"))
        {
            return {
                error: "user name exists", status: 409
            }
        } else {
            throw error;
        }


    }
}
export function getUsers()
{
    return businessDb.prepare(`
    SELECT * FROM users
    `).all();
}

export function getUser(id) {
    const user = businessDb.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!users){
        return {
            error: "user not found", status: 404
        }
    }
    return user;
}
export function createBusiness(name) {
    const businessId = uuidv4();
    const createdAt = Date.now();

    try {
        businessDb.prepare(
            `
            INSERT INTO businesses (id, name, created_at) VALUES (?, ?, ?, ?)
            `
        ).run(businessId, name, createdAt);
        return {
            id: businessId,
            name,
            createdAt
        }
    } catch (error) {
        if (error.message.includes("UNIQUE constraint failed"))
        {
            return {
                error: "business name exists", status: 409
            }
        } else {
            throw error;
        }


    }
}
export function getBusinesses()
{
    return businessDb.prepare(`
    SELECT * FROM businesses
    `).all();
}

export function getBusiness(id) {
    const business = businessDb.prepare(`SELECT * FROM businesses WHERE id = ?`).get(id);
    if (!businesses){
        return {
            error: "business not found", status: 404
        }
    }
    return business;
}