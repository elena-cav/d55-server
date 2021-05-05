const readingsRouter = require('express').Router();
const {
  postReadings,
  getReadings
} = require('../controllers/readingsController');
const { handle405s } = require('../errors');

readingsRouter.route('/').post(postReadings).get(getReadings).all(handle405s);
module.exports = readingsRouter;
