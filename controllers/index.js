// Express Router
const router = require("express").Router();
// Routes
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api/");
const dashboardRoutes = require("./dashboardRoutes");
// Route Path Declarations
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
// Export
module.exports = router;