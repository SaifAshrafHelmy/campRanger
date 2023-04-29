# Hi, I'm Saif! 👋


# campRanger Backend Project Readme

This backend project is built using **Node.js**, **Express**, **MongoDB**, **EJS**, **Joi Validation**, **Passport** for login, **mongoSanitize** for sanitizing data, **Helmet** for security and protection, **Connect-Mongo** for session store, and **Cloudinary** for uploading images.

 The basic idea of this project is to create a platform where users can find campgrounds, add new campgrounds, and add reviews about them. Users can view, add, edit, and delete campgrounds and add and delete reviews on their show page. The project also utilizes a cluster map from **Mapbox** to show available campgrounds around the US map, and a Mapbox map inside every campground show page to show its location.


## Features

- Find campgrounds
- Add new campgrounds
- Add reviews about campgrounds
- View, add, edit, and delete campgrounds
- Add and delete reviews on the campground show page
- Utilizes a cluster map from Mapbox to show available campgrounds around the US map
- Utilizes a Mapbox map inside every campground show page to show its location
- Uses Passport for user login authentication
- Uses mongoSanitize for data sanitization
- Uses Helmet for security and protection
- Uses Connect-Mongo for session store
- Uses Cloudinary for uploading images


## Deployment

The project is deployed using Render [here](https://campranger.onrender.com/).

## Installation

To install and run this project, you will need to have **Node.js** and **MongoDB** installed on your computer. You can follow these steps:

1. Clone this repository to your local machine
2. Install dependencies using `npm install`
3. Create a `.env` file in the root directory with the following variables:

DB_URL=<your-mongodb-url>
sessionSecret=<your-session-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>



4. Run the app using `npm start`
5. Access the app at `http://localhost:3000`

## Dependencies

- Express
- EJS
- Joi
- Method-override
- Mongoose
- Morgan
- Passport
- Passport-local
- Connect-flash
- Express-mongo-sanitize
- Helmet
- Ejs-mate
- Cloudinary

## File Structure

├── db
|   ├── campground.js
|   ├── review.js
|   └── user.js
├── middleware
|   ├── index.js
|   ├── isLoggedIn.js
|   └── wrapAsync.js
├── models
|   ├── campground.js
|   └── review.js
├── public
|   ├── images
|   └── javascripts
├── routes
|   ├── campgrounds.js
|   ├── index.js
|   ├── reviews.js
|   └── users.js
├── utils
|   └── middlewares.js
├── views
|   ├── campgrounds
|   ├── error.ejs
|   ├── home.ejs
|   ├── reviews
|   ├── users
|   └── notfound.ejs
├── app.js
├── package.json
├── README.md
└── .env (not included in the repository)


## Credits
This project was created by Saif Ashraf Helmy for practicing Node.js API making, CRUD operations, and web development in general.

## License
This project is licensed under the MIT license