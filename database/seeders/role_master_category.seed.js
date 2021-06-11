// Write seed here
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'RoleMasterCategories',
        [
          {
            name: 'admin',
            roleCategoryIds: JSON.stringify([1,2,3,4,5]),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'doctor',
            roleCategoryIds: JSON.stringify([2,5]),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoleMasterCategories', null, {});
    },
  };
  