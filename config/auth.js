module.exports = function(req, res, next) {
    // If user is logged in, call next middleware
    if ( req.isAuthenticated() ) return next();
    // User is not logged in, so redirect
    res.redirect('/auth/google');
  };