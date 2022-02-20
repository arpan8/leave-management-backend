const express = require('express');
const router = express.Router();

const Employee = require('../../controllers/employee');
const uploadFile = require("../../services/common");

router.post('/add-employee', Employee.addEmployee);
router.post('/signin', Employee.signIn);
router.get('/employee-details',Employee.verifyjwtToken, Employee.employeeDetails);
router.post('/emp-img-upload',uploadFile.single('empImg'), Employee.empImgUpload)
module.exports = router