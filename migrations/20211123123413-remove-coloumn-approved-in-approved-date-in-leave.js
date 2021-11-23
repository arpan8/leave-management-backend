'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('leaves', 'approved_by'),
      queryInterface.removeColumn('leaves', 'approved_date')
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ 
        queryInterface.addColumn('leaves', 'approved_date', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('leaves', 'approved_by', {
        type: Sequelize.INTEGER,
      }),
    ])
  }
};
