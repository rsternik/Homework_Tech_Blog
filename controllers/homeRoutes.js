// NODE dependencies
const router = require("express").Router();
// Models 
const { User, Post, Comment } = require("../models");
// Database Connection
const sequelize = require("../config/connection");
// .get - /
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
        .then((dbWriteData) => {
            // Error check Conditional 
            if (!dbWriteData) {
                res.status(404).json({ message: "Existing Posts data empty" });
                return;
            }
            const posts = dbWriteData.map((post) => post.get({ plain: true }));
            // Use map method on existing posts
            res.render("home", { posts, loggedIn: req.session.loggedIn });
        })
        // Server error catch
        .catch((err) => {
            res.status(500).json(err);
        });
});
// .get /viewpost/:id
router.get("/viewpost/:id", (req, res) => {
    // Locate post
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
                res.status(404).json({ message: "Post not found!" });
                return;
            }
            const post = dbPostData.get({ plain: true });
            // Get post data
            const myPost = post.user_id == req.session.user_id;
            res.render("single-post", {
                post,
                loggedIn: req.session.loggedIn,
                currentUser: myPost,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
// .get for /login
router.get("/login", (req, res) => {
    res.render("login", { loggedIn: req.session.loggedIn });
});
// .get /dahsboard
router.get("/dashboard", (req, res) => {
    // Find all posts
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
                res.status(404).json({ message: "Post not found!" });
                return;
            }
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            // .map through user posts    
            res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// .get /post 
router.get("/post", (req, res) => {
    res.render("create-post", { loggedIn: req.session.loggedIn });
});
// .get /edit/:id
router.get("/edit/:id", (req, res) => {
    res.render("edit-post", {
        loggedIn: req.session.loggedIn,
        post_id: req.params.id,
    });
});
// Export Router
module.exports = router;