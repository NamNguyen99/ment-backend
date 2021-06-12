module.exports = (app) => {
  const roles = require('../../controllers/admin/role.controller');
  const {authAdmin} = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.get('/list_role_categories', roles.listAllRoleCategory);
  router.get('/list_role_master_categories', roles.listAllRoleMasterCategory);
  router.post('/role_categories', roles.createRoleCategory);
  router.post('/role_master_categories', roles.createRoleMasterCategory);

  app.use('/api/admin/roles',authAdmin, router);
};