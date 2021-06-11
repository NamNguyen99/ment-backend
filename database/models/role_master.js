'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoleMaster.init({
    name: DataTypes.STRING,
    roleMasterCategoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    roleCategoryIds: DataTypes.TEXT,
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'RoleMaster',
  });
  return RoleMaster;
};