const accountsRouter = require('express').Router();
const {
  getAccounts,
  patchAccount
} = require('../controllers/accountsController');

accountsRouter.route('/').get(getAccounts);
accountsRouter.route('/:account_id').patch(patchAccount);
module.exports = accountsRouter;
