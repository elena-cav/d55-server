const { sendReadings } = require('../models/readingsModel');

exports.postReadings = (req, res, next) => {
  sendReadings(req.body)
    .then((readings) => {
      res.status(201).send(readings);
    })
    .catch((err) => next(err));
};
