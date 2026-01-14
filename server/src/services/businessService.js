import { v4 as uuidv4 } from "uuid";
import { businessDb } from "../config/database.js";

// Create business into database

export function createBusiness(
  businessName,
  description,
  businessType,
  photos
) {
  const businessId = uuidv4();
    const photoId = uuidv4();
  const createdAt = Date.now();

  try {
    businessDb
      .prepare(
        `
            INSERT INTO businesses (business_id, business_name, description, business_type, created_at) 
            VALUES (?, ?, ?, ?, ?)
            `
      )
      .run(businessId, businessName, description, businessType, createdAt);

      photos.forEach(p => {
        businessDb.prepare(`
          INSERT INTO photos (photo_id, business_id, filename, original_name, path, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
          `)
          .run(photoId, businessId, p.filename, p.originalname, p.path, createdAt);
      })
    return {
      businessId,
      businessName,
      description,
      businessType,
      createdAt,
    };
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return {
        error: "business name exists",
        status: 409,
      };
    } else {
      throw error;
    }
  }
}

// Get ALL businesses

export function getAllBusinesses() {
  const allBusinesses = businessDb.prepare(`SELECT * FROM businesses`).all();
  const allReviews = businessDb.prepare(`SELECT * FROM reviews`).all();
  const businessesWithReviews = [];
  console.log(allBusinesses);
  console.log(allReviews);

  for (let i = 0; i < allBusinesses.length; i++) {
    const b = allBusinesses[i];
    const reviews = getReviewsByBusinessId(b.business_id);
    const photos = getPhotosByBusinessId(b.business_id)
    const business = {
      businessId: b.business_id,
      businessName: b.business_name,
      description: b.description,
      businessType: b.business_type,
      reviews: reviews,
      photos: photos
    };
    businessesWithReviews.push(business);
  }

  return businessesWithReviews;
}

// Get business by Id

export function getBusiness(id) {
  var business = businessDb
    .prepare(`SELECT * FROM businesses WHERE business_id = ?`)
    .get(id);
  if (!business) {
    return {
      error: "business not found",
      status: 404,
    };
  }

  const reviews = getReviewsByBusinessId(id);
  const photos = getPhotosByBusinessId(id);
  business = {
    ...business,
    reviews: reviews,
    photos: photos
  };
  return business;
}

// REVIEWS SECTION

// Get Reviews by BUSINESS Id
export function getReviewsByBusinessId(businessId) {
  const reviews = businessDb
    .prepare(`SELECT * FROM reviews WHERE business_id = ?`)
    .all(businessId);
  if (!reviews) {
    return {
      error: "no reviews found for business",
      status: 404,
    };
  }
  return reviews;
}

// Create and send over a review
export function createReview(businessId, reviewUser, rating, comment) {
  const reviewId = uuidv4();
  const createdAt = Date.now();

  try {
    businessDb
      .prepare(
        `
            INSERT INTO reviews (review_id, business_id, review_user, rating, comment, created_at) 
            VALUES (?, ?, ?, ?, ?, ?)
            `
      )
      .run(reviewId, businessId, reviewUser, rating, comment, createdAt);
    return {
      reviewId,
      businessId,
      reviewUser,
      rating,
      comment,
      createdAt,
    };
  } catch (error) {
    throw error;
  }
}

// PHOTOS SECTION

// Get Reviews by BUSINESS Id
export function getPhotosByBusinessId(businessId) {
  const photos = businessDb
    .prepare(`SELECT * FROM photos WHERE business_id = ?`)
    .all(businessId);
  if (!photos) {
    return {
      error: "no photos found for business",
      status: 404,
    };
  }
  return photos;
}
