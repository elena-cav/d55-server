const accountsRouter = require('express').Router();
const {
  getAccounts,
  patchAccount
} = require('../controllers/accountsController');
const { handle405s } = require('../errors');

accountsRouter.route('/').get(getAccounts).all(handle405s);
accountsRouter.route('/:account_id').patch(patchAccount).all(handle405s);
module.exports = accountsRouter;
