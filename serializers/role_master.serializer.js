const roleCategorySerializer = require("./role_category.serializer");
const roleMasterCategorySerializer = require("./role_master_category.serializer");

const roleMasterSerializer = {
  new: (roleMaster, roleMasterCategory, roleCategories) => {
    return ({
      id: roleMaster.id,
      name: roleMaster.name,
      userId: roleMaster.userId,
      roleMasterCategory: roleMasterCategory ? roleMasterCategorySerializer.new(roleMasterCategory) : roleMaster.roleMasterId,
      roleCategories: roleCategories ? roleCategories.map(item => roleCategorySerializer.new(item)) : JSON.parse(roleMaster.roleCategoryIds),
    })
  }
};

module.exports = roleMasterSerializer;
  