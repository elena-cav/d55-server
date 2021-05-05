const apiRouter = require('express').Router();
// const { handle405s, handle404s } = require('../errors');

const readingsRouter = require('./readingsRouter');
apiRouter.use('/readings', readingsRouter);

// apiRouter.route('/*').all(handle404s);

module.exports = apiRouter;
