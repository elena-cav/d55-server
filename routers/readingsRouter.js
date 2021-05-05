const readingsRouter = require('express').Router();
const { postReadings } = require('../controllers/readingsController');
// const { handle405s } = require('../errors');

readingsRouter.route('/').post(postReadings);
// .all(handle405s);
module.exports = readingsRouter;
