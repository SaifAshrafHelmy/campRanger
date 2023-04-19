

const AppError = require("./AppError");
const Campground = require("../db/campground.js");
const Review = require("../db/review.js")
const joiCampgroundSchema = require('../joiSchemas/joiCampgroundSchema.js')
const joiReviewSchema = require('../joiSchemas/joiReviewSchema.js');







module.exports.isLoggedIn = (req,res,next)=>{

  if(req.isAuthenticated()){
    next();

  }else{
    req.session.returnTo = req.originalUrl;
    // console.log(req.session)
    req.flash('error', 'you must sign in first!')
    res.redirect('/login')
  }
}
module.exports.isAuthorized =async (req,res,next)=>{
  const {id}  = req.params;
  let campground = await Campground.findById(id);


  if(!campground.author.equals(req.user._id)){

    req.flash('error', "you're not authorized to do that!")
    return res.redirect(`/campgrounds/${id}`)
  }

  next();

}

module.exports.isAuthorizedForReview =async (req,res,next)=>{
  const {id} = req.params;
  const {reviewID} = req.params;

 const foundRev= await Review.findById(reviewID);

 if(!foundRev.author.equals(req.user._id)){
  req.flash("error", "you're not authorized to do that!");
  res.redirect(`/campgrounds/${id}`)
 }
 next()
}


module.exports.joiCampgroundValidator = function(req,res,next) {
  
  const {error} = joiCampgroundSchema.validate(req.body);
  
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new AppError(msg, 400)
  }else {
    next();
  }
}

module.exports.joiReviewValidator = function(req,res,next) {
  
  const {error} = joiReviewSchema.validate(req.body);
  
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new AppError(msg, 400);
  }else {
    next();
  }
  };


module.exports.wrapAsync = (fn) =>{
  return function (req, res, next) {
    
    fn(req, res, next).catch((error) => {
      if (error.name === "CastError") {
        // Handle invalid ID error from Mongoose
        error.message = "Invalid campground ID";
        error.status = 400;
      } else if (error.name === "ValidationError") {
        // Handle validation error from Mongoose
        error.message = "Validation error";
        error.status = 400;
      } else {
        // Handle all other errors
        error.status = error.status || 500;
      }
      next(error);
    });
  };
}

