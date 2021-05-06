const {
  fetchAccounts,
  updateAccount,
  checkAccountExists
} = require('../models/accountsModel');

exports.getAccounts = (req, res, next) => {
  fetchAccounts(req.query)
    .then((accounts) => {
      res.status(200).send({ accounts });
    })
    .catch((err) => next(err));
};

exports.patchAccount = (req, res, next) => {
  checkAccountExists(req.params)
    .then(() => {
      return updateAccount(req.body, req.params);
    })
    .then((account) => {
      res.status(200).send({ account });
    })
    .catch((err) => next(err));
};
