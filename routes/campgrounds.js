const express = require('express')
const router = express.Router();
const Campground = require("../db/campground.js");
const { isLoggedIn, isAuthorized, joiCampgroundValidator, wrapAsync } = require('../utils/middlewares');
const campControl = require('../controllers/campgroundController.js');
const {storage} = require('../cloudinary/index.js')

const multer  = require('multer')
const upload = multer({ storage })




router.route('/')
.get( wrapAsync(campControl.getAllCamps)  )
.post( isLoggedIn,
   upload.array('imageFile', {timeout:60000}, function(error,result){}),
   joiCampgroundValidator, wrapAsync(campControl.makeNewCamp) )




router.get("/new", isLoggedIn, campControl.renderNewCampForm
);




router.get("/search", wrapAsync(campControl.searchCamps)
);

// default

router.route('/:id')
.get( wrapAsync(campControl.showCampPage)   )

.put( isLoggedIn, isAuthorized,
   upload.array('imageFile', {timeout:60000}, function(error,result){}),
   joiCampgroundValidator, wrapAsync(campControl.editCamp)   )

.delete( isLoggedIn, isAuthorized, wrapAsync(campControl.deleteCamp)   );


router.get("/:id/edit", isLoggedIn, isAuthorized, wrapAsync(campControl.showCampEditForm)
);









module.exports = router;
