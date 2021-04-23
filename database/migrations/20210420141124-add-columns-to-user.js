'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Users', 'nameWithoutTone', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'militaryCode', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Users', 'isBlock', {
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('Users', 'role', {
        type: Sequelize.STRING
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'nameWithoutTone'),
      queryInterface.removeColumn('Users', 'militaryCode'),
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'isBlock'),
      queryInterface.changeColumn(
        'Users',
        'role', 
        {
          type: Sequelize.INTEGER
        }
      )
    ];
  }
};
