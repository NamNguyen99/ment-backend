module.exports = (app) => {
  const comments = require('../../controllers/admin/comment.controller.js');
  const { authAdmin } = require('../../middlewares/auth.middleware');
  const { commentsMiddleware } = require('../../middlewares/role.middleware');


  var router = require('express').Router();

  router.post('/', comments.create);
  router.put('/:id', comments.update);

  app.use('/api/admin/comments', [authAdmin, commentsMiddleware], router);
};
