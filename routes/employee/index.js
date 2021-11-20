const express = require('express');
const router = express.Router();

const Employee = require('../../controllers/employee');

router.post('/add-employee', Employee.addEmployee);

module.exports = router