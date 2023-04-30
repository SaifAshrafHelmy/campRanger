# Hi, I'm Saif! 👋


# campRanger Backend Project


**The project is deployed using Render [here](https://campranger.onrender.com/).**

The main idea of this project is to create a website where people can find and share information about campgrounds. Users can look up, add, change, and delete campground listings, and they can also write and remove reviews. The website uses a special map from Mapbox to show where the campgrounds are located across the United States. Each campground also has its own map showing exactly where it is.




This project is built using a variety of technologies to ensure its functionality, security, and user experience. Specifically, the technologies used are:
- `Node.js`: a JavaScript runtime environment used for building server-side applications
- `Express`: a web application framework for Node.js used for building RESTful APIs and web applications
- `MongoDB`: a NoSQL database used for data storage and retrieval
- `EJS`: a templating engine used for rendering dynamic HTML pages
- `Joi Validation`: a validation library used for validating user input
- `Passport`: an authentication middleware used for user authentication
- `mongoSanitize`: a library used for sanitizing user input to prevent injection attacks
- `Helmet`: a security middleware used for setting HTTP headers and adding additional security to the application
- `Connect-Mongo`: a session store for Express applications, used for managing user sessions
- `Cloudinary`: a cloud-based image and video management service used for uploading, storing, and delivering images efficiently.






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
```
campRanger/
|── app.js
|── db
│   ├── campground.js
│   ├── review.js
│   └── user.js
|── joiSchemas
│   ├── joiCampgroundSchema.js
│   └── joiReviewSchema.js
|── routes
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
|── controllers
│   ├── campgroundController.js
│   ├── reviewController.js
│   └── userController.js
|── utils
│   ├── AppError.js
│   └── middlewares.js
|── views
│   ├── campgrounds
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── error.ejs
│   ├── home.ejs
│   ├── layouts
│   │   └── boilerplate.ejs
│   ├── notfound.ejs
│   ├── partials
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   └── users
│       ├── login.ejs
│       └── register.ejs
|── cloudinary
│   └── index.js
|── seeds
│   ├── cities.js
│   ├── indexSeed.js
│   └── seedHelpers.js
|── public
│   ├── assets
│   │   └── camping-favicon.png
│   ├── BSvalidateForm.js
│   ├── clusterMap.js
│   ├── main.js
│   ├── ShowPageMap.js
│   └── stylesheets
│       ├── app.css
│       ├── home.css
│       └── stars.css
|── package.json
|── package-lock.json
|── README.md


 ```


## Credits
This project was created by Saif Ashraf Helmy for practicing Node.js API making, CRUD operations, and web development in general.

## License
This project is licensed under the MIT license
