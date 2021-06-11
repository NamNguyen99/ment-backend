'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoleCategory.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'RoleCategory',
  });
  return RoleCategory;
};