const express = require('express');
const router = express.Router({mergeParams:true});

const Campground = require("../db/campground.js");
const Review = require("../db/review.js");
const AppError = require("../utils/AppError.js")

const { wrapAsync, isLoggedIn, isAuthorizedForReview} = require('../utils/middlewares');
const {joiReviewValidator} = require('../utils/middlewares.js')

const reviewControl = require('../controllers/reviewController.js')




  
router.post('/', isLoggedIn, joiReviewValidator, wrapAsync(reviewControl.postNewReview)
)



router.delete('/:reviewID',isLoggedIn ,isAuthorizedForReview , wrapAsync(reviewControl.deleteReview))

















module.exports = router;
