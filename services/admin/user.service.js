const { User, Sequelize } = require('../../database/models');
const Op = Sequelize.Op;

const userSerializer = require("../../serializers/user.serializer")


module.exports = {
  createUser: async (userParam) => {
    let saveResult = false;
    if (userParam) {
      const builder = User.build(userParam);
      saveResult = await builder.save();
    }
    return userSerializer.new(saveResult);
  },

  updateUser: async (userParam) => {
    let result = false;
    if (userParam && userParam.id) {
      const userModel = await User.findByPk(userParam.id);
      if (userModel) {
        result = await userModel.update(userParam);
      }
    }
    return userSerializer.new(result);
  },

  deleteUser: async (id) => {
    let deleteResult = false;
    if (id) {
      const deleteModel = await User.findByPk(id);
      if (deleteModel) {
        deleteResult = await deleteModel.destroy();
      }
    }
    return deleteResult;
  },

  findOneUser: async (id) => {
    const user = await User.findByPk(id);
    return userSerializer.new(user);
  },

  findByConditionUser: async ({ user }) => {
    const fullName = user ? user.fullName : null;
    const email = user ? user.email : null;
    var condition = { 
      fullName: { [Op.substring]: fullName ? fullName : "" },
      email: { [Op.substring]: email ? email : "" },
    };
    const users = await User.findAll({where: condition});
    return users.map(item => userSerializer.new(item));
  }
}
