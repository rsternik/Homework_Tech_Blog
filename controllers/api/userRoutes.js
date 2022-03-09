const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//get route for all the users
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "username", "email", "password"], //TODO remove password in the futrue
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "title", "body"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) //include the posts and comments of the specific user
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get user by specific id
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "username", "email", "password"], //remove password in the futrue
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "title", "body"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) //include the posts and comments of this user
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post route to add a user
router.post("/", (req, res) => {
  User.create({
    //expects username, email, password
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      //save the data in a session
      req.session.save(() => {
        // run the save function
        req.session.user_id = dbUserData.id; 
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData); 
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//login route for the user
router.post("/login", (req, res) => {
  //find the user
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      //check if the user is present
      if (!dbUserData) {
        res.status(400).json({ message: "User not found" });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);

      //proceed based on results
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect Password!" });
        return;
      }

      //save things in a session
      req.session.save(() => {
        //declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        //send response
        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//remove a user by specific id
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Log out the user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // end the session
      res.status(204).end();
    });
  } else {
    res.status(404).end(); // 404 response if no user
  }
});

//export router
module.exports = router;
