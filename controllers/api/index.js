const router = require('express').Router();

//  /api/ routes for users/posts/comments
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

//  use the users/posts/comments routes created above
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

//export router
module.exports = router;