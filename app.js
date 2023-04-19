if(process.env.NODE !== 'production'){
  require('dotenv').config();
}
// @TODO make login redirects to same page before login
// @TODO make all index images have same width

const express = require("express");
const app = express();

const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const Joi = require('joi')
const methodOverride = require("method-override");
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./db/user')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');




// mongodb://localhost:27017/yelp-camp
// const MongoDBUrl = process.env.DB_URL;
// const dbUrl = 'mongodb://localhost:27017/yelp-camp';
const dbUrl = process.env.DB_URL;


mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongoose connection Failed:"));
db.once("open", () => console.log("mongoose connection succeeded"));



const store = new MongoStore({
  mongoUrl: 'mongodb://localhost:27017/yelp-camp',
  secret:'thisisnotthesamesecret',
  touchAfter: 24*60*60, //in seconds

})
store.on('error', function(e){
  console.log('SESSION STORE ERROR:', e)
})

const sessionConfig = {
  store,
  name: '_stsn',
  secret:'thisissdsdsudssspersketchy!!',
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly: true,
    // @TODO:  enable in production
    // secure: true,   
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  }
}
app.use(session(sessionConfig));

app.use(flash())
  
// app.use(helmet())

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());







app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
// functions that add and remove the req.user
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use(mongoSanitize({
  replaceWith: '_'
}))


app.use((req,res,next)=>{

  // this one has to be after the serialization functions
  res.locals.currentUser = req.user;

  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next();
})




const { wrapAsync} = require('./utils/middlewares');
const Campground = require("./db/campground.js");
const Review = require("./db/review.js")

app.use(express.static('public'))



app.set("view engine", "ejs");
app.set("views", "views");
app.engine("ejs", ejsMate);

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));


// app.use(morgan("dev"));












// ROUTES
const campRouter = require('./routes/campgrounds')
app.use('/campgrounds', campRouter )

// review routes

const reviewRouter = require('./routes/reviews')
app.use('/campgrounds/:id/reviews', reviewRouter )

//user
const userRouter = require('./routes/users')
app.use('/', userRouter)


// campground routes



app.get("/", wrapAsync(async (req, res) => {

  res.render("home",);
})
);






app.use((req, res) => {
  res.render("notfound.ejs");
});

app.use((err, req, res, next) => {
  const { message = "Sorry, something went wrong in the server side", status = 500, stack='' } = err;


  res.status(status).render('error.ejs' ,{message, status, stack})
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`express server is listening on port ${port}`);
}); 


