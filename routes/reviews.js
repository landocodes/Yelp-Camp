const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews')
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");
const Campground = require("../models/campground");
const Review = require("../models/review");

const catchAsync = require("../util/catchAsyncError");
const ExpressError = require("../util/ExpressError");

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;