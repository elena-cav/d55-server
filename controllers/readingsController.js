const {
  sendReadings,
  fetchReadings,
  validateKeys
} = require('../models/readingsModel');

exports.postReadings = (req, res, next) => {
  Promise.all([sendReadings(req.body), validateKeys(req.body)])
    .then(([readings]) => {
      res.status(201).send(readings);
    })
    .catch((err) => next(err));
};
exports.getReadings = (req, res, next) => {
  fetchReadings()
    .then((readings) => {
      res.status(200).send(readings);
    })
    .catch((err) => next(err));
};
