const express = require('express')
const router = express.Router();
const User = require('../db/user')
const { wrapAsync} = require('../utils/middlewares');
const passport = require('passport')


const userControl = require('../controllers/userController');




router.route('/register')
.get( userControl.renderRegisterForm)
.post( wrapAsync(userControl.registerUser))




router.route('/login')
.get(userControl.renderLoginForm)
.post(passport.authenticate('local', {failureFlash: true, failureRedirect:'/login', keepSessionInfo: true})
, userControl.loginUser)
// passport.authenticate checks/validates username and password to db values




router.get('/logout', userControl.logoutUser)

module.exports= router;
