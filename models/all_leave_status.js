'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class all_leave_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  all_leave_status.init({
    leave_id: DataTypes.INTEGER,
    approved_or_rejected_by: DataTypes.INTEGER,
    approve_or_reject_date: DataTypes.DATE,
    leave_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'all_leave_status',
  });
  return all_leave_status;
};