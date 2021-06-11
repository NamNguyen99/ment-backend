// Write seed here
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'RoleMasters',
        [
          {
            name: 'admin',
            roleMasterId: 1,
            userId: 1,
            roleCategoryIds: JSON.stringify([1,2,3,4,5]),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoleMasters', null, {});
    },
  };
  