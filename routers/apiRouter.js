const apiRouter = require('express').Router();
const accountsRouter = require('./accountsRouter');
const readingsRouter = require('./readingsRouter');
apiRouter.use('/readings', readingsRouter);
apiRouter.use('/accounts', accountsRouter);

module.exports = apiRouter;
