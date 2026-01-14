import express from "express";
import path from "path";
import multer from "multer";
import {getAllBusinesses, createBusiness, createReview, getBusiness} from "../services/businessService.js";
const businessRouter = express.Router();

// Multer setup

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'src/uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 20
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// === End of Multer Setup ===

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

businessRouter.post("/business", upload.array("photos"), (req, res) => {
  try {
    console.log(req.files)
    const photos = req.files;
    const {businessName, description, businessType } = req.body;

    const business = createBusiness(businessName, description, businessType, photos);
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