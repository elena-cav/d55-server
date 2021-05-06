exports.up = function (knex) {
  return knex.schema.createTable('readings', (readingsTable) => {
    readingsTable.string('meter_reading_id').primary();
    readingsTable.string('account_id');
    readingsTable.string('reading');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('readings');
};
