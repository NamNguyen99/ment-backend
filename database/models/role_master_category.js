'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleMasterCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoleMasterCategory.init({
    name: DataTypes.STRING,
    roleCategoryIds: DataTypes.TEXT,
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'RoleMasterCategory',
  });
  return RoleMasterCategory;
};