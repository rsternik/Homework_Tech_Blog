// Authenticate
const withAuth = (req, res, next) => {
  // Redirect to login page if logged out
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};
// Export
module.exports = withAuth;