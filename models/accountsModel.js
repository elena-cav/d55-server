const dbConnection = require('../db/dbConnection');

exports.checkAccountExists = ({ account_id }) => {
  return dbConnection
    .select('*')
    .from('accounts')
    .where({ account_id })
    .then(([account]) => {
      if (account === undefined) {
        return Promise.reject({
          status: 404,
          msg: `Account ID ${account_id} not found`
        });
      }
    });
};

exports.fetchAccounts = ({ sort_by, order }) => {
  return dbConnection
    .select('*')
    .from('accounts')
    .orderBy(sort_by || 'account_id', order || 'asc');
};

exports.updateAccount = (input, { account_id }) => {
  const { email, first_name, surname } = input;
  console.log(first_name);

  const validInput = (key) =>
    key === 'email' ||
    key === 'first_name' ||
    key === 'surname' ||
    key === undefined;

  const inputsAreInvalid = !Object.keys(input).every(validInput);

  const invalidInputsRej = () => {
    return Promise.reject({
      status: 400,
      msg: `Invalid entry`
    });
  };

  if (inputsAreInvalid) return invalidInputsRej();

  return dbConnection
    .select('*')
    .from('accounts')
    .where({ account_id })
    .returning('*')
    .then(([account]) => {
      if (email) {
        account.email = email;
      }
      if (first_name) {
        account.first_name = first_name;
      }
      if (surname) {
        account.surname = surname;
      }
      return account;
    });
};
