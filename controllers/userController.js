const User = require('../db/user')


module.exports.renderRegisterForm = (req,res)=>{
  res.render('users/register.ejs')
}


module.exports.registerUser = async (req,res)=>{

  try {
    const {username, email, password}= req.body;
    const user = new User({username, email});
    const newUser = await User.register(user, password)
  // doesn't support promises/ async/await, you have to use callbacks
  // pass the registered use
    req.login(newUser, function(err) {
      if (err) { return next(err); }
      req.flash('success', 'successfully registered!')
      res.redirect('/campgrounds')
    });
  } catch (error) {
    req.flash('error', error.message)
    res.redirect('/register')
    
  }
}


module.exports.renderLoginForm = (req,res)=>{
  // console.log(req.session)


  res.render('users/login.ejs')
}

module.exports.loginUser = (req,res)=>{
  req.flash('success', 'Welcome back, user!')
  // console.log(req.session)

    const redirectUrl = req.session.returnTo || '/campgrounds';
      delete req.session.returnTo;
  res.redirect(redirectUrl)

}

module.exports.logoutUser = (req,res,next)=>{
  req.logOut(function(err){
    if(err){       return next(err)      };


    req.flash('success', 'successfully logged out')
    res.redirect('/campgrounds')
  })

}