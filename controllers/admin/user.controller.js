const userServices = require('../../services/admin/user.service');
const db = require("../../database/models");
const roleMasterSerializer = require("../../serializers/role_master.serializer")

const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');

const RoleMaster = db.RoleMaster;
const RoleMasterCategory = db.RoleMasterCategory;
const RoleCategory = db.RoleCategory;
const Op = db.Sequelize.Op;

const userController = {
  create: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await userServices.createUser(req.body);
      if (result) {
        resultUtil.onSuccess(serviceResult, result);
      } else {
        resultUtil.onError(serviceResult, result);
      }
    } catch (error) {
      resultUtil.onException(res, serviceResult, error);

    } finally {
      res.json(serviceResult);
    }
  },

  findAll: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await userServices.findByConditionUser(req.query);
      if (result) {
        resultUtil.onSuccess(serviceResult, result);
      } else {
        resultUtil.onError(serviceResult, result);
      }
    } catch (error) {
      resultUtil.onException(res, serviceResult, error);

    } finally {
      res.json(serviceResult);
    }
  },

  findOne: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await userServices.findOneUser(req.params.id);
      resultUtil.onSuccess(serviceResult, result);

    } catch (error) {
      resultUtil.onException(res, serviceResult, error);

    } finally {
      res.json(serviceResult);
    }
  },

  update: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await userServices.updateUser(req.body);
      if (result) {
        resultUtil.onSuccess(serviceResult, result);
      } else {
        resultUtil.onError(serviceResult, result);

      }
    } catch (error) {
      resultUtil.onException(res, serviceResult, error);

    } finally {
      res.json(serviceResult);
    }
  },

  delete: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await userServices.deleteUser(req.params.id);
      if (result) {
        resultUtil.onSuccess(serviceResult, result);
      } else {
        resultUtil.onError(serviceResult, result);

      }
    } catch (error) {
      resultUtil.onException(res, serviceResult, error);

    } finally {
      res.json(serviceResult);
    }
  },

  createRoleMaster: async (req, res) => {
    let serviceResult = resultUtil.new()
    try {
      const roleMaster = req.body;
      roleMaster.roleCategoryIds = JSON.stringify(req.body.roleCategoryIds)
      const data = await RoleMaster.create(roleMaster);
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        const roleMasterCategory = await RoleMasterCategory.findByPk(data.roleMasterId)
        const roleCategories = await RoleCategory.findAll(
          {
            where: { id: { [Op.in]: JSON.parse(data.roleCategoryIds) } }
          }
        )
        serviceResult.data = roleMasterSerializer.new(data, roleMasterCategory, roleCategories);
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while creating the role master.";
      }
    } catch(error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  updateRoleMaster: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const id = req.params.id;
      const updateParams = req.body;
      if (updateParams && updateParams.roleCategoryIds) {
        updateParams.roleCategoryIds = JSON.stringify(updateParams.roleCategoryIds);
      }
      const [flag] = await RoleMaster.update(updateParams, { where: { id: id } });
      if (flag == 1) {
        serviceResult.code = 200;
        serviceResult.success = true;
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Error updating role with id=" + id;
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
}

module.exports = userController;
