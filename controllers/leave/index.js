const Leave = require('../../models').leave;
const LeaveStatus = require('../../models').all_leave_status;
const Employee = require('../../models').employee;
const Designation = require('../../models').designation;

async function addOrUpdateLeave(req, res) {
    try {

        const rb = req.body;

        let msg = rb.id ? 'Leave updated successfully' : 'Leave applied successfully';

        if(rb.id){

            if(rb.leave_status == 'Approved' || rb.leave_status == 'Rejected'){

                return res.json({
                    success: true,
                    msg: 'Leave is already '+ rb.leave_status
                });

            }

            await Leave.update({
                user_id: req.user.id,
                designation_id: req.user.designation_id,
                from_date: rb.from_date,
                to_date: rb.to_date,
                type_of_day: rb.type_of_day,
                leave_type: rb.leave_type,
                reason: rb.reason,
                leave_status: rb.leave_status,
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
                leave_apply_date: new Date(),
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

async function leaveDetails(req, res){
    try {
        let leaves = await Leave.findAll({
            where:{
                user_id: req.user.id
            },
            include:[{
                model: LeaveStatus
            }]
        })

        if(leaves.length == 0){
            return res.json({
                success: true,
                msg: 'No leave taken'
            })
        }
        res.json({
            success: true,
            msg: 'No leave taken',
            details: leaves
        })

    } catch (error) {
        console.log(error)
    }
}

async function leaveApprovalOrRejection(req, res){
    const rb = req.body;

    let userDesignation = await Designation.finDone({
        where:{
            id: req.user.designation_id
        }
    });

    if(userDesignation.name != 'HR' || userDesignation.name != 'Admin' ||  userDesignation.name != 'Project Manager'){

        return res.json({
            success: false,
            msg: 'Only admin, HR, Project Manager can change leave status'
        });

    }

    let checkLeave = await Leave.findOne({
        where:{
            id: rb.leave_id
        }
    })

    await Leave.update({
        leave_status: rb.leave_status
    },{
        id: rb.leave_id
    });

    await LeaveStatus.create({
        leave_id: rb.leave_id,
        approved_or_rejected_by: rb.user.id,
        approved_or_reject_date: new Date(),
        leave_status: rb.leave_status
    });

    if(rb.leave_status == 'Rejected'){

        let employee = await Employee.findOne({
            where:{
                id: checkLeave.user_id
            },
            attributes:{ exclude:['created_at','updated_at','password']}
        });

        await employee.update({
            no_of_sick_leaves: checkLeave.leave_type == 'sick' ? checkLeave.type_of_day == 'full' ? employee.no_of_sick_leaves + 1 : employee.no_of_sick_leaves + 0.5 : employee.no_of_sick_leaves,
            no_of_casual_leaves: checkLeave.leave_type == 'casual' ? checkLeave.type_of_day == 'full' ? employee.no_of_casual_leaves + 1 : employee.no_of_casual_leaves + 0.5 : employee.no_of_casual_leaves,
        },{
            id: employee.id
        })
    }

    let status =rb.leave_status.charAt(0).toLowerCase() + rb.leave_status.slice(1);

    res.json({
        success: true,
        msg: `Leave ${status}`
    })
}

module.exports = {
    addOrUpdateLeave,
    leaveDetails,
    leaveApprovalOrRejection
}