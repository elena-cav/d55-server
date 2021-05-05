const { fetchAccounts } = require('../models/accountsModel');

exports.getAccounts = (req, res, next) => {
  fetchAccounts()
    .then((accounts) => {
      res.status(200).send(accounts);
    })
    .catch((err) => next(err));
};
