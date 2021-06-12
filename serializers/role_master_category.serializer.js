const roleCategorySerializer = require("./role_category.serializer");

const roleMasterCategorySerializer = {
  new: (roleMasterCategory, roleCategories) => {
    return ({
      id: roleMasterCategory.id,
      name: roleMasterCategory.name,
      roleCategories: roleCategories ? roleCategories.map(item => roleCategorySerializer.new(item)) : JSON.parse(roleMasterCategory.roleCategoryIds),
    })
  }
};

module.exports = roleMasterCategorySerializer;
  