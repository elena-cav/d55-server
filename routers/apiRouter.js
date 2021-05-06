const apiRouter = require('express').Router();
const { handle404s } = require('../errors');

const accountsRouter = require('./accountsRouter');
const readingsRouter = require('./readingsRouter');
apiRouter.use('/readings', readingsRouter);
apiRouter.use('/accounts', accountsRouter);
apiRouter.route('/*').all(handle404s);

module.exports = apiRouter;
