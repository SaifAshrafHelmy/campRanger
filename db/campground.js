const mongoose = require("mongoose");
const Review = require('./review')
const User = require('./user')

const Schema = mongoose.Schema;



const ImageSchema = new Schema(
  {
    url: String,
    filename: String
  }
)
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200')
})



const opts = {toJSON: {virtuals: true}}

const CampgroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  images:[ImageSchema],
  description: String,
  location: String,
  geometry: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <br>
  <p>${this.description.substring(0,80)}...</p>
  `

})



CampgroundSchema.post('findOneAndDelete', async (campground) => {
  if (campground.reviews.length) {
    await Review.deleteMany({ _id: { $in: campground.reviews } })
  }
  // console.log('campground delete middleware working')

})

const Campground = mongoose.model("Campground", CampgroundSchema);

module.exports = Campground;
