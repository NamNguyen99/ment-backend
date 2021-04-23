// Write seed here
const bcrypt = require("bcrypt-nodejs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'Nguyễn Văn A',
          nameWithoutTone: 'Nguyen Van A',
          email: 'admin@gmail.com',
          phone: '0123456789',
          militaryCode: "b2b3",
          gender: 0,
          isBlock: 0,
          type: '',
          password: bcrypt.hashSync("123456", bcrypt.genSaltSync(8), null),
          role: 'admin',
          joinArmy: new Date('2020-06-01T00:00:00.000Z'),
          unit: 1,
          rank: "b2",
          position: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
