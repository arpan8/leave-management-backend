'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn('leaves', 'work_resume', {
      type: Sequelize.DATE,
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('leaves', 'work_resume', {})
  }
};
