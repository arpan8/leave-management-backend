const express = require('express');
const router = express.Router();

const Employee = require('../../controllers/employee');
const Leave = require('../../controllers/leave');

router.post('/add-or-update-leave', Employee.verifyjwtToken, Leave.addOrUpdateLeave);
router.post('/change-leave-status', Employee.verifyjwtToken, Leave.leaveApprovalOrRejection);
router.get('/leaves', Employee.verifyjwtToken, Leave.leaveDetails);


module.exports = router