
const Campground = require("../db/campground.js");
const {cloudinary} = require('../cloudinary/index.js')

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;

const geocodingClient = mbxGeocoding({accessToken:mapBoxToken});








module.exports.renderNewCampForm =   (req, res) => {
  res.render("campgrounds/new");
}

module.exports.makeNewCamp = async (req, res, next) => {

  const geoData = await geocodingClient.forwardGeocode({
      query: req.body.location,
      limit: 1
  }).send();
  

  let newCampData = req.body;
  newCampData.author = req.user._id;
  newCampData.images =   req.files.map( f=>({url: f.path, filename: f.filename})    );
  newCampData.geometry =   geoData.body.features[0].geometry;

  let campground = await Campground.create(newCampData);
  // console.log(campground)

  req.flash('success', 'Successfully added a new campground!')
  res.redirect(`/campgrounds/${campground.id}`);

} 

module.exports.searchCamps = async (req, res, next) => {
  const { q } = req.query;
  let campgrounds;
  campgrounds = await Campground.find({ title: new RegExp(q, "i") });
  //  or find({title: {$regex: `/${searchQuery}/i`}}

  res.render("campgrounds/index", { campgrounds, pgTitle: "Search Results" });
}

module.exports.getAllCamps = async (req, res, next) => {

  const campgrounds = await Campground.find();
  res.render("campgrounds/index", {
    campgrounds,
    pgTitle: "All Campgrounds",
  });
}

module.exports.showCampPage = async (req, res, next) => {
  let { id } = req.params;

  let campground = await Campground.findById(id).populate('author', 'username')
 .populate({
  path: 'reviews',
  populate:{
    path:'author',
  }
 });

  
  if (!campground) {
    req.flash('error', 'Cannot find the requested campground!')
    res.redirect(`/campgrounds`);
  } else {
    // console.log(campground)
    
    res.render("campgrounds/show", { campground });
  };


}


module.exports.showCampEditForm = async (req, res, next) => {
  let { id } = req.params;
  
  let campground = await Campground.findById(id);
  


  
  if (!campground) {
    req.flash('error', 'Cannot find the requested campground!')
    return res.redirect(`/campgrounds`);
  } 



    res.render("campgrounds/edit", { campground });
  
}

module.exports.editCamp =  async (req, res, next) => {
  let { id } = req.params;
  let editedCamp = req.body;

  let campground = await Campground.findByIdAndUpdate(id, editedCamp, {
    runValidators: true,
  });
  
  // console.log(req.files)
  const newImgs = req.files.map( f=> ({url:f.path, filename:f.filename }));
  //  console.log(newImgs)
  campground.images.push(   ...newImgs  );
  await campground.save();
  if(req.body.deleteImages){
    for(let filename of req.body.deleteImages){
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}   }     }       })

  }

  if (!campground) {
    req.flash('error', 'Cannot find the requested campground!')
    res.redirect(`/campgrounds`);
  } else {
    req.flash('success', 'Successfully updated the campground!')

    res.redirect(`/campgrounds/${campground.id}`);
  }
}

module.exports.deleteCamp = async (req, res, next) => {
  let { id } = req.params;

  let campground = await Campground.findByIdAndDelete(id);

  if (!campground) {
    req.flash('error', 'Cannot find the requested campground!')
    res.redirect(`/campgrounds`);
  } else {
    req.flash('success', 'Successfully deleted the campground!')
    res.redirect(`/campgrounds`);
  }
}