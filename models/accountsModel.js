const dbConnection = require('../db/dbConnection');

exports.fetchAccounts = () => {
  return dbConnection.select('*').from('accounts');
};
