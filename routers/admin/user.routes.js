module.exports = app => {
  const users = require("../../controllers/admin/user.controller.js");
  const authMiddleware = require('../../middlewares/auth.middleware');
  const { usersMiddleware } = require('../../middlewares/role.middleware');

  var router = require("express").Router();

  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  router.post("/create_role", users.createRoleMaster);
  router.put("/update_role/:id", users.updateRoleMaster);

  app.use('/api/admin/users', [authMiddleware.authAdmin, usersMiddleware], router);
};
