const express = require('express');
const router = express.Router();
const tasksRoutes = require('./tasks.js');

router.use('/', tasksRoutes);

module.exports = router;