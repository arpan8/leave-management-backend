'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn('employees', 'password', {
      type: Sequelize.STRING,
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('employees', 'password', {})
  }
};
