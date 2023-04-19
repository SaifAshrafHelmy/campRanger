const Campground = require("../db/campground.js");
const Review = require("../db/review.js");


module.exports.postNewReview = async (req,res, next)=>{
  let { id } = req.params;
  let reviewBody = req.body;
  // console.log(reviewBody)

  
  
  const campground = await Campground.findById(id);
  // console.log(campground)
  
  
  const review = await new Review(reviewBody);
  review.author = req.user._id;

  await review.save()
  // console.log(review)


  await campground.reviews.push(review)
  await campground.save()


  // console.log(campground)
  // await campground.populate('reviews');
  
  // console.log(await campground.populate('reviews'))
  req.flash('success', 'Your review was posted successfully!')


  res.redirect(`/campgrounds/${id}`)
  // res.send("Success")

}


module.exports.deleteReview = async (req,res)=>{
  const {id} = req.params;
  const {reviewID} = req.params;



  // console.log(reviewID)
  // here we want to delete the son from the parent's ref array.
  // we want to pull from the reviews array,  and we want to pull the ones that match the reviewID

  await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewID}})

  await Review.findByIdAndDelete(reviewID)

  req.flash('success', 'the review was deleted successfully!')
  
  res.redirect(`/campgrounds/${id}`)
    

}