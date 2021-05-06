const { fetchAllEndpoints } = require('../models/apiModel');

exports.getAllEndpoints = (req, res, next) => {
  fetchAllEndpoints()
    .then((endpoints) => {
      res.status(200).send(endpoints);
    })
    .catch((err) => next(err));
};
