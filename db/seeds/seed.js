const { accountsData, readingsData } = require('../data/index');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return Promise.all([
        knex.insert(accountsData).into('accounts'),
        knex.insert(readingsData).into('readings')
      ]);
    });
};
