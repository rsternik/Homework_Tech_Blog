// Authenticater
const withAuth = (req, res, next) => {
    // No login redirect
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  // Export
  module.exports = withAuth;