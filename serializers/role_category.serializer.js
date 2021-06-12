const roleCategorySerializer = {
  new: (roleCategory) => {
    return ({
      id: roleCategory.id,
      name: roleCategory.name,
      code: roleCategory.code
    })
  }
};

module.exports = roleCategorySerializer;
