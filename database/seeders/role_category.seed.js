// Write seed here
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'RoleCategories',
      [
        {
          name: 'user',
          code: '100',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'officertest',
          code: '200',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'test',
          code: '300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'testpool',
          code: '400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'comment',
          code: '500',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RoleCategories', null, {});
  },
};
