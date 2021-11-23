const express = require('express');
const router = express.Router();

const Employee = require('../../controllers/employee');
const Leave = require('../../controllers/leave');

router.post('/add-or-update-leave', Employee.verifyjwtToken, Leave.addOrUpdateLeave);


module.exports = router