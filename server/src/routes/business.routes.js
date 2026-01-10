import express from "express";
import {getAllBusinesses, createBusiness} from "../services/businessService.js";
const businessRouter = express.Router();

businessRouter.get("/business", (req, res) => {
  try {
    const users = getAllBusinesses();
    res.json({
      success: true,
      businesses: businesses
    })
  } catch (err) {
    console.error("Error getting business", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to retreive business!"
    })
  }
});

// login POST requests

businessRouter.post("/business", (req, res) => {
  try {
    var { name } = req.body;
    if (!name) return res.status(400).json({error: "name not given"});
    name = name.trim();


    const business = createBusiness(name);
    if (business.error) {
      return res.status(business.status).json({ error: business.error });
    }
    return res.status(201).json({ success: true, business });
  } catch (err) {
    console.error("Error posting business", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to post business!"
    })
  }
});

export default businessRouter;