const apiRouter = require('express').Router();
const { handle404s } = require('../errors');
const { getAllEndpoints } = require('../controllers/apiController');

const accountsRouter = require('./accountsRouter');
const readingsRouter = require('./readingsRouter');
apiRouter.route('/').get(getAllEndpoints);
apiRouter.use('/readings', readingsRouter);
apiRouter.use('/accounts', accountsRouter);

apiRouter.route('/*').all(handle404s);

module.exports = apiRouter;
