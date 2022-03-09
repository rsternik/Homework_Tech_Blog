// Router
const router = require("express").Router();
// Models
const { User, Post, Comment } = require("../../models");
// All Comments get route
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
  }) // Include users comments
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Comment by id get route
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
  }) // Current users post comments
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No posts match this id." });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Write Comment route
router.post("/", (req, res) => {
  // Write comment to DB
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
// Delete comment by id
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
});// Export
module.exports = router;