import express from "express";
import {getAllBusinesses, createBusiness, createReview, getBusiness} from "../services/businessService.js";
const businessRouter = express.Router();
import { deleteBusiness } from "../services/businessService.js";
businessRouter.get("/business", (req, res) => {
  try {
    const businesses = getAllBusinesses();
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
businessRouter.delete("/business/:id", (req, res) => {
  try {
    const result = deleteBusiness(req.params.id);

    if (!result.success) {
      return res.status(result.status).json(result);
    }

    res.json(result);
  } catch (err) {
    console.error("Error deleting business", err.message);
    res.status(500).json({ success: false, error: "Failed to delete business" });
  }
});
businessRouter.get("/business/:id", (req, res) => {
  try {
    const businessId = req.params.id;
    const business = getBusiness(businessId)
    res.json({
      success: true,
      business: business
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
    var {businessName, description, businessType } = req.body;

    const business = createBusiness(businessName, description, businessType);
    if (business.error) {
      return res.status(business.status).json({ error: business.error });
    }
    return res.status(201).json({ success: true, message: "Posted business successfully!", business });
  } catch (err) {
    console.error("Error posting business", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to post business!"
    })
  }
});




// REVIEWS

// businessRouter.get("/reviews", (req, res) => {
//   try {
//     const businesses = getAllBusinesses();
//     res.json({
//       success: true,
//       businesses: businesses
//     })
//   } catch (err) {
//     console.error("Error getting business", err.message);
//     res.status(500).json({
//       success: false,
//       error: "Failed to retreive business!"
//     })
//   }
// });

// login POST requests

businessRouter.post("/reviews", (req, res) => {
  try {
    var {businessId, reviewUser, rating, comment} = req.body;

    const review = createReview(businessId, reviewUser, rating, comment);
    if (review.error) {
      return res.status(review.status).json({ error: review.error });
    }
    return res.status(201).json({ success: true, review });
  } catch (err) {
    console.error("Error posting review", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to post review!"
    })
  }
});

export default businessRouter;