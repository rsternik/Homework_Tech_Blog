const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//get route for all the comments
router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  }) //include the posts and comments for the current user
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get route for comment by id number
router.get("/:id", (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "comment_text", "user_id", "post_id", "created_at"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  }) //include the posts and comments for the current user
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add comment route
router.post("/", (req, res) => {
  //expecting comment_text, user_id, post_id
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//remove comment by id
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//export router 
module.exports = router;