'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  leave.init({
    user_id: DataTypes.INTEGER,
    designation_id: DataTypes.INTEGER,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    type_of_day: DataTypes.STRING,
    leave_type: DataTypes.STRING,
    reason: DataTypes.TEXT,
    approved_by: DataTypes.INTEGER,
    approved_date: DataTypes.DATE,
    leave_status: DataTypes.STRING,
    leave_apply_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'leave',
  });
  return leave;
};