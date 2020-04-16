
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('password').notNullable();
    table.string('cep').notNullable();
    table.string('city').notNullable();
    table.string('address').notNullable();
    table.string('neighborhood').notNullable();
    table.string('uf', 2).notNullable();
  });

};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
