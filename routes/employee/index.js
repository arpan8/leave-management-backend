const express = require('express');
const router = express.Router();

const Employee = require('../../controllers/employee');

router.post('/add-employee', Employee.addEmployee);
router.post('/signin', Employee.signIn);
router.get('/employee-details',Employee.verifyjwtToken, Employee.employeeDetails);

module.exports = router