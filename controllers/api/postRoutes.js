const router = require("express").Router();
const { Post, Comment } = require("../../models");

//get route for all the posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "body", "user_id", "created_at"],
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id", "created_at"],
      },
    ],
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get post by specific id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "body", "user_id", "created_at"],
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id", "created_at"],
      },
    ],
  }) //include the posts and comments of the specific user
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add a post
router.post("/", (req, res) => {
  // This will make a new post
  // Expects Title, body, user_id
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); //REST api needs status
    });
});

//update a post by id
router.put("/:id", (req, res) => {
  console.log("The id is ", req.params.id);
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//remove a post by id
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//export router
module.exports = router;