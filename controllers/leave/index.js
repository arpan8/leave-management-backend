const Leave = require('../../models').leave;
const LeaveStatus = require('../../models').all_leave_status;
const Employee = require('../../models').employee;
const Designation = require('../../models').designation;

async function addOrUpdateLeave(req, res) {
    try {

        const rb = req.body;

        let msg = rb.id ? 'Leave updated successfully' : 'Leave applied successfully';

        if(rb.id){

            await Leave.update({
                user_id: req.user.id,
                designation_id: req.user.designation_id,
                from_date: rb.from_date,
                to_date: rb.to_date,
                type_of_day: rb.type_of_day,
                leave_type: rb.leave_type,
                reason: rb.reason,
                leave_status: 'Pending',
                leave_apply_date: rb.leave_apply_date,
                work_resume: rb.work_resume
            },{
                where:{
                    id: rb.id
                }
            });
            
            
        }else{

            await Leave.create({
                user_id: req.user.id,
                designation_id: req.user.designation_id,
                from_date: rb.from_date,
                to_date: rb.to_date,
                type_of_day: rb.type_of_day,
                leave_type: rb.leave_type,
                reason: rb.reason,
                leave_status: 'Pending',
                leave_apply_date: rb.leave_apply_date,
                work_resume: rb.work_resume
            });
    
            const empDetails = await Employee.findOne({
                where:{
                    id: req.user.id
                },attributes:{ exclude:['created_at','updated_at','password']},
            });
    
            await Employee.update({
                no_of_sick_leaves: rb.leave_type == 'sick' ? rb.type_of_day == 'full' ? empDetails.no_of_sick_leaves - 1 : empDetails.no_of_sick_leaves - 0.5 : empDetails.no_of_sick_leaves,
                no_of_casual_leaves: rb.leave_type == 'casual' ? rb.type_of_day == 'full' ? empDetails.no_of_casual_leaves - 1 : empDetails.no_of_casual_leaves - 0.5 : empDetails.no_of_casual_leaves,
            },{
                where:{
                    id: req.user.id
                }
            });
        }

        res.json({
            success: true,
            msg
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addOrUpdateLeave
}