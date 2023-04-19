const mongoose = require("mongoose");

const Campground = require("../db/campground.js");
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers.js')



mongoose.connect("mongodb://localhost:27017/yelp-camp");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongoose connection Failed:"));
db.once('open', ()=>  console.log("mongoose connection succeeded"));




let arrRandomiser = (array) => array[Math.floor( Math.random() * array.length )];
let numRandomiser = ()=> random1000 = Math.floor(Math.random() * 1000);
let priceRandomiser = ()=> randomPrice = Math.floor(Math.random()*60 +10);

/* 
let imgCustomUrl;


let imageUrlFetcher = async ()=>{
  imgCustomUrl = await fetch('https://source.unsplash.com/collection/483251')
  .then( res =>  res.url);
  

}

 */



const makeRandomCamp = async function(){

  numRandomiser();
  priceRandomiser();
  // imageUrlFetcher()

  let newCamp = new Campground({
    
    title: `${arrRandomiser(descriptors)} ${arrRandomiser(places)}`,
    location: `${cities[random1000].city}, ${cities[random1000].state}`,
    // image:`${imgCustomUrl}`,
    description: `Our campground is located in the heart of the lush forest, surrounded by towering trees and a babbling brook. This picturesque location offers the perfect getaway for nature lovers and outdoor enthusiasts. We have everything you need to make your stay comfortable and unforgettable.`,
    price:`${randomPrice}`,
    author:`6421b958ce74d0c12857c1ad`,
    geometry:{
      type: "Point",
      coordinates: [cities[random1000].longitude, cities[random1000].latitude] 
    },
    images:
    [ {
      url: 'https://res.cloudinary.com/dbmxu1zb8/image/upload/v1680181536/yelpCamp/l4mhmqzh2ne2tg6j24qi.jpg',
      filename: 'yelpCamp/l4mhmqzh2ne2tg6j24qi',
    },
    {
      url: 'https://res.cloudinary.com/dbmxu1zb8/image/upload/v1680181540/yelpCamp/hkrge4bjktpkwe5fx6tv.jpg',
      filename: 'yelpCamp/hkrge4bjktpkwe5fx6tv',
    },
    {
      url: 'https://res.cloudinary.com/dbmxu1zb8/image/upload/v1680181561/yelpCamp/c6pxbrvse54b2hl6ltua.jpg',
      filename: 'yelpCamp/c6pxbrvse54b2hl6ltua',
    }
  ]
  })
  await newCamp.save();


}

const seedDb = async ()=>{
  await Campground.deleteMany({});
  
   for(let i=0; i<400; i++){
    await makeRandomCamp();
   }
  

}
seedDb()
.then(()=> db.close())

