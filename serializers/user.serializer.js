const roleMasterSerializer = require("./role_master.serializer");

const userSerializer = {
  new: (user, roleMaster) => {
    return ({
      id:           user.id,
      fullName:     user.fullName,
      email:        user.email,
      address:      user.address,
      phone:        user.phone,
      type:         user.type,
      role:         user.role,
      joinArmy:     user.joinArmy,
      unit:         user.unit,
      rank:         user.rank,
      position:     user.position,
      roleMaster:   roleMaster ? roleMasterSerializer.new(roleMaster) : null
    })
  }
};

module.exports = userSerializer;
