const Employee = require('../../models').employee;
const { hashPassword, verifyPassword } = require('../../services/password');
const jwt = require('jsonwebtoken');
const Designation = require('../../models').designation;
async function addEmployee(req, res){
    try {
        const rb = req.body;

        let check_employee = await Employee.findOne({
            where:{
                email: rb.email
            },attributes: ['id']
        });

        if(check_employee){
            return res.json({
                success: false,
                msg: 'Employee already exists',
            })
        }

        let password = await hashPassword(rb.password)

        let create = await Employee.create({
            emp_id: Math.random().toString(36).slice(2),
            name: rb.name,
            email: rb.email,
            mobile_number: rb.mobile_number,
            profile_pic: 'https://gravatar.com/avatar/090eab79240851fe38586a210eb8bd64?s=400&d=robohash&r=x',
            designation_id: rb.designation_id,
            no_of_sick_leaves: 5,
            no_of_casual_leaves: 12,
            password: password
        });

        res.json({
            success: true,
            msg: 'Employee created successfully',
            create
        })
    } catch (error) {
        console.log(error)
    }
}


async function signIn(req, res){
    try {
        const rb = req.body;
        
        let employee = await Employee.findOne({
            where:{
                email: rb.email
            }
        });
        
        if(!employee){
            return res.json({
                success: false,
                msg: 'Employee with this email not exists'
            })
        }

        let hashedPassword = employee.password;

        let checkPassword = verifyPassword(rb.password, hashedPassword);

        if(checkPassword){

            delete employee.dataValues.password;

            let token = jwt.sign({
                id: employee.id,
                emp_id: employee.emp_id,
                name: employee.name,
                email: employee.email,
                mobile_number: employee.mobile_number,
                profile_pic: employee.profile_pic,
                no_of_sick_leaves: employee.no_of_sick_leaves,
                no_of_casual_leaves: employee.no_of_casual_leaves,
                designation_id: employee.designation_id
            }, process.env.JWTSECRET, { expiresIn: '1h' });

            return res.json({
                success: true,
                msg: 'Sign In successfully',
                details: {employee, token}
            })

        }else{
            return res.json({
                success: false,
                msg: 'wrong password',
                
            })
        }

        


    } catch (error) {
        console.log(error)
    }
}

function verifyjwtToken (req, res, next) {
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        
        const token =  req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.JWTSECRET, (err, payload)=>{
            if(err){
                throw err
            }
            req.user = payload;
            next();
        })
    }else{
        
        return res.status(401).send('Unauthorize')
    }
}

async function employeeDetails(req, res){
    try {

        let id = req.user.id;

        let employee = await Employee.findOne({
            where:{
                id
            },
            attributes:{ exclude:['created_at','updated_at','password']},
            include:[{
                model: Designation
            }]
        });

        res.json({
            success: true,
            msg: 'User feteched successfully',
            details: employee
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    addEmployee,
    signIn,
    verifyjwtToken,
    employeeDetails
}