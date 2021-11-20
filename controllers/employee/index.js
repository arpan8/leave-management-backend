const Employee = require('../../models').employee;

async function addEmployee(req, res){
    try {
        const rb =req.body;

        let create = await Employee.create({
            emp_id: Math.random().toString(36).slice(2),
            name: rb.name,
            email: rb.email,
            mobile_number: RadioNodeList.mobile_number,
            profile_pic: 'https://gravatar.com/avatar/090eab79240851fe38586a210eb8bd64?s=400&d=robohash&r=x',
            designation_id: rb.designation_id,
            no_of_sick_leaves: 5,
            no_of_casual_leaves: 12
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

module.exports={
    addEmployee
}