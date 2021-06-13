const { User, RoleMaster, Sequelize } = require('../../database/models');
const Op = Sequelize.Op;

const userSerializer = require("../../serializers/user.serializer")


module.exports = {
  createUser: async (userParam) => {
    let saveResult = false;
    if (userParam) {
      const builder = User.build(userParam.user);
      saveResult = await builder.save();
      roleParams = userParam.roleMaster;
      roleParams.userId = saveResult.id
      roleParams.roleCategoryIds = JSON.stringify(roleParams.roleCategoryIds);
      const roleBuilder = RoleMaster.build(roleParams);
      roleMaster = await roleBuilder.save()
    }
    return userSerializer.new(saveResult, roleMaster);
  },

  updateUser: async (userParam) => {
    let result = false;
    if (userParam && userParam.user && userParam.user.id) {
      const userModel = await User.findByPk(userParam.user.id);
      const roleModel = await RoleMaster.findOne({ where: { userId: userModel.id } });
      if (userModel) {
        result = await userModel.update(userParam.user);
      }
      if (roleModel) {
        roleParams = userParam.roleMaster;
        roleParams.roleCategoryIds = JSON.stringify(roleParams.roleCategoryIds);
        roleMaster = await roleModel.update(roleParams)
      }
    }
    return userSerializer.new(result, roleMaster);
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
    const roleMaster = await RoleMaster.findOne({ where: { userId: user.id } });
    return userSerializer.new(user, roleMaster);
  },

  findByConditionUser: async ({ user }) => {
    const fullName = user ? user.fullName : null;
    const email = user ? user.email : null;
    var condition = { 
      fullName: { [Op.substring]: fullName ? fullName : "" },
      email: { [Op.substring]: email ? email : "" },
    };
    const users = await User.findAll({where: condition});

    const action = users.map(item => {
      return RoleMaster.findOne({
        where: { userId: item.id }
      })
    })
    let result = await Promise.all(action);
    
    serviceResult = users.map((value, index) => {
      return userSerializer.new(value, result[index]);
    });

    return serviceResult;
  }
}
