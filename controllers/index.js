// Required NODE depencies
const router = require("express").Router();
// Required Route files
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api/");
const dashboardRoutes = require("./dashboardRoutes");
// Router Path Declaration
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
// Export Router
module.exports = router;