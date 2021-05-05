const accountsRouter = require('express').Router();
const { getAccounts } = require('../controllers/accountsController');
const { handle405s } = require('../errors');

accountsRouter.route('/').get(getAccounts).all(handle405s);
module.exports = accountsRouter;
