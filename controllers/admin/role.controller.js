const db = require("../../database/models");
const roleCategorySerializer = require("../../serializers/role_category.serializer")
const roleMasterCategorySerializer = require("../../serializers/role_master_category.serializer")
const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');

const RoleCategory = db.RoleCategory;
const RoleMasterCategory = db.RoleMasterCategory;

const Op = db.Sequelize.Op;

const roleController = {
  /**
   * @endpoint POST("/role_categories")
   * @param {*} req 
   * @param {*} res 
   */
  createRoleCategory: async (req, res) => {
    let serviceResult = resultUtil.new()
    try {
      const roleCategory = req.body;
      const data = await RoleCategory.create(roleCategory);
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = roleCategorySerializer.new(data);
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while creating the role Category.";
      }
    } catch(error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  /**
   * @endpoint GET("/role_categories")
   * @param {*} req 
   * @param {*} res 
   */
  listAllRoleCategory: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const data = await RoleCategory.findAll()
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = data.map(item => roleCategorySerializer.new(item));
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while retrieving test pools.";
      }
    } catch(error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
  /**
   * @endpoint POST("/role_categories")
   * @param {*} req 
   * @param {*} res 
   */
  createRoleMasterCategory: async (req, res) => {
    let serviceResult = resultUtil.new()
    try {
      const roleMasterCategory = req.body;
      roleMasterCategory.roleCategoryIds = JSON.stringify(req.body.roleCategoryIds)
      const data = await RoleMasterCategory.create(roleMasterCategory);
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = roleMasterCategorySerializer.new(data);
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while creating the role master category.";
      }
    } catch(error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  /**
   * @endpoint GET("/test_pools")
   * @param {*} req 
   * @param {*} res 
   */
  listAllRoleMasterCategory: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const data = await RoleMasterCategory.findAll()
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        const action = data.map(item => {
          return RoleCategory.findAll({
            where: { id: { [Op.in]: JSON.parse(item.roleCategoryIds) } }
          })
        })
        let result = await Promise.all(action);
        serviceResult.data = data.map((value, index) => {
          return roleMasterCategorySerializer.new(value, result[index]);
        });
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while retrieving test pools.";
      }
    } catch(error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
}

module.exports = roleController;
