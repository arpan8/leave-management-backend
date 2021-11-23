const express = require('express');
const router = express.Router();

router.use(require('../routes/employee')); // employee related api
router.use(require('../routes/leave')); // leave related api

module.exports = router