'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('all_leave_statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leave_id: {
        type: Sequelize.INTEGER
      },
      approved_or_rejected_by: {
        type: Sequelize.INTEGER
      },
      approve_or_reject_date: {
        type: Sequelize.DATE
      },
      leave_status: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('all_leave_statuses');
  }
};