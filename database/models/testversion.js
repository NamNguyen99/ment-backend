'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestVersion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TestVersion.init({
    name: DataTypes.STRING,
    index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TestVersion',
  });
  return TestVersion;
};