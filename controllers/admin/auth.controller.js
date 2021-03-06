const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt-nodejs");

const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');

const appSetting = require('../../appconfig/app.config');
const db = require("../../database/models");
const userSerializer = require('../../serializers/user.serializer');
const { User, RoleMaster } = db;

const authController = {
  login: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      user = await User.findOne({ where: { email: req.body.email } })
      if (!user) {
        serviceResult.success = false;
        serviceResult.error = 'Authentication failed. User not found.';
        serviceResult.code = 404;
      } else {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          serviceResult.success = false;
          serviceResult.error = 'Authentication failed. Wrong password.';
          serviceResult.code = 401;
        } else {
          const roleMaster = await RoleMaster.findOne({ where: { userId: user.id } });
          token = jwt.sign({
            email: user.email,
            name: user.fullName,
            id: user.id,
            role: roleMaster.name,
            roleListId: roleMaster.roleCategoryIds
          }, appSetting.jwtConfig.secretKey, {
            expiresIn: appSetting.jwtConfig.expire
          });
          serviceResult.code = 200;
          serviceResult.success = true;
          serviceResult.token = token;
          serviceResult.data = userSerializer.new(user, roleMaster);
        }
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  logout: async (req, res) => {
    try {

    } catch (error) {
      res.status(400).message(error);
    }
  },

  getCurrentUser: async (req, res) => {
    const token = req.headers[appSetting.authKey];
    try {
      const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
      if (decode) {
        const user = await User.findOne({ where: { email: decode.email } });
        res.status(200).json({
          message: user
        });
      } else {
        res.status(200).json({
          success: false,
          error: "Token is invalid"
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = authController;
