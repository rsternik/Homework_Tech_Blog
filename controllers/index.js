const router = require("express").Router();

// home/api/dashboard routes
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api/");
const dashboardRoutes = require("./dashboardRoutes");

// use the home/api/dashboard routes
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

//export router
module.exports = router;