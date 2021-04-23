const userServices = require('../../services/admin/user.service');

const resultUtil = require('../../servicehelper/service.result');

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
}

module.exports = userController;
