const dbConnection = require('../db/dbConnection');

exports.fetchAccounts = ({ sort_by, order }) => {
  return dbConnection
    .select('*')
    .from('accounts')
    .orderBy(sort_by || 'account_id', order || 'asc');
};
