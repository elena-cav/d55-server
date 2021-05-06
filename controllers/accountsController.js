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
  Promise.all([
    updateAccount(req.body, req.params),
    checkAccountExists(req.params)
  ])
    .then(([account]) => {
      res.status(200).send({ account });
    })
    .catch((err) => next(err));
};
