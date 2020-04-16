
exports.up = function (knex) {
  return knex.schema.createTable('donations', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('donor_id').notNullable();
    table.string('cep').notNullable();
    table.string('city').notNullable();
    table.string('address').notNullable();
    table.string('neighborhood').notNullable();
    table.string('uf', 2).notNullable();
    table.string('whatsapp').notNullable();
    table.string('email').notNullable();
    table
      .foreign('donor_id')
      .references('id')
      .inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('donations');

};
