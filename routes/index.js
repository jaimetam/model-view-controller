const router = require('express').Router();
const homeRoutes = require('./Home');
const dashboardRoutes = require('./Dashboard');

router.use('/', homeRoutes);
router.use('/', dashboardRoutes);

module.exports = router;