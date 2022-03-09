const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

//get route for homepage all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "body", "user_id", "created_at"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id", "created_at"],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const posts = dbPostData.map((post) => post.get({ plain: true })); // .map method on all the posts
      console.log(posts);
      res.render("home", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get route for a single post by id
router.get("/viewpost/:id", (req, res) => {
  //find one post
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "body", "user_id", "created_at"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const post = dbPostData.get({ plain: true }); // .get for the post data
      console.log(post);
      const myPost = post.user_id == req.session.user_id;
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        currentUser: myPost,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get route for the login page
router.get("/login", (req, res) => {
  console.log("Is logged in?", req.session.loggedIn);
  res.render("login", { loggedIn: req.session.loggedIn });
});

//get route for the dashboard based on user id
router.get("/dashboard", (req, res) => {
  //we need to get all posts
  console.log(req.session.user_id, " this is the session id");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "body", "user_id", "created_at"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const posts = dbPostData.map((post) => post.get({ plain: true })); // .map on all the users posts
      console.log(posts);
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// .get route for create-post to create a new post
router.get("/post", (req, res) => {
  res.render("create-post", { loggedIn: req.session.loggedIn });
});

//load the edit page for updating a post
router.get("/edit/:id", (req, res) => {
  //    post_id: req.postID,
  res.render("edit-post", {
    loggedIn: req.session.loggedIn,
    post_id: req.params.id,
  });
});

//export router
module.exports = router;