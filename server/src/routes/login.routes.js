import express from "express";
import {getAllUsers, createUser} from "../services/userService.js";
const router = express.Router();

router.get("/users", (req, res) => {
  try {
    const users = getAllUsers();
    res.json({
      success: true,
      users: users
    })
  } catch (err) {
    console.error("Error getting users", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to retreive login users!"
    })
  }
});

// login POST requests

router.post("/users", (req, res) => {
  try {
    var {username, password} = req.body;
    if (!username || !password) return res.status(400).json({error: "username or password not given"});
    username = username.trim();
    password = password.trim();

    const user = createUser(username, password);
    if (user.error) {
      return res.status(user.status).json({ error: user.error });
    }
    return res.status(201).json({ success: true, user });
  } catch (err) {
    console.error("Error posting login user", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to post login user!"
    })
  }
});

export default router;