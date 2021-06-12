const appSetting = require('../appconfig/app.config');
const jwt = require('jsonwebtoken');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { roleType } = require('../enum/enumerations');


const roleHandler = (req, res, next, roleCommand) => {
  let result = false;
  try {
    if (req.method !== "GET") {
      const token = req.headers[appSetting.authKey],
        decode = jwt.verify(token, appSetting.jwtConfig.secretKey),
        { roleListId } = decode;
      if (roleListId) {
        const roleListIdDeserialize = JSON.parse(roleListId);
        if (Array.isArray(roleListIdDeserialize)) {
          if (roleListIdDeserialize.some(x => x === roleCommand)) {
            result = true;
          }
        }
      }
    } else {
      result = true;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (result) {
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        code: StatusCodes.UNAUTHORIZED
      });
    }
  }
}

const roleMiddlewares = {
  commentsMiddleware: function (req, res, next) {
    roleHandler(req, res, next, roleType.comment);
  },
  usersMiddleware: function (req, res, next) {
    roleHandler(req, res, next, roleType.user);
  },
  officerTestsMiddleware: function (req, res, next) {
    roleHandler(req, res, next, roleType.officerTest);
  },
  testsMiddleware: function (req, res, next) {
    roleHandler(req, res, next, roleType.testsMiddleware);
  },
  testPoolsMiddleware: function (req, res, next) {
    roleHandler(req, res, next, roleType.testPool);
  }
}
module.exports = roleMiddlewares;