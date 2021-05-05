exports.up = function (knex) {
  return knex.schema.createTable('accounts', (accountsTable) => {
    accountsTable.string('account_id').primary();
    accountsTable.string('first_name').notNullable();
    accountsTable.string('surname').notNullable();
    accountsTable.string('email').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('accounts');
};
