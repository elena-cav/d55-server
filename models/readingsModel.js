const dbConnection = require('../db/dbConnection');
const { getValidAndInvalid } = require('../utils/utils');
exports.validateKeys = ([body]) => {
  if (
    body.data[0] !== 'meter_reading_id' ||
    body.data[1] !== 'account_id' ||
    body.data[2] !== 'reading'
  ) {
    return Promise.reject({
      status: 400,
      msg: `Invalid format. Please refer to the template CSV`
    });
  }
};

exports.sendReadings = (readings) => {
  return dbConnection
    .select('*')
    .from('accounts')
    .then((accounts) => {
      const { invalid, valid } = getValidAndInvalid(readings, accounts);

      return dbConnection('readings')
        .insert(valid)
        .onConflict('meter_reading_id')
        .ignore()
        .then(() => {
          return {
            validSubmissions: valid,
            invalidSubmissions: invalid
          };
        });
    })
    .catch((err) => console.log(err));
};

exports.fetchReadings = ({ sort_by, order }) => {
  return dbConnection
    .select('*')
    .from('readings')
    .orderBy(sort_by || 'meter_reading_id', order || 'asc');
};
