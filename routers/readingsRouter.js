const readingsRouter = require('express').Router();
const {
  postReadings,
  getReadings
} = require('../controllers/readingsController');

readingsRouter.route('/').post(postReadings).get(getReadings);
module.exports = readingsRouter;
