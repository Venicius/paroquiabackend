exports.up = function (knex) {
  return knex.schema.createTable("missas", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.string("local").notNullable();
    table.dateTime("data").notNullable();
    table.integer("capacidade").notNullable();
    table.integer("disponiveis").notNullable();
    table.boolean("ativo").notNullable().defaultTo(true);
    table.timestamp("creat_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("missas");
};
