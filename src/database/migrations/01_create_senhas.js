exports.up = function (knex) {
  return knex.schema.createTable("senhas", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.string("whatsapp").notNullable();
    table.string("email")
    table
      .integer("missa_id")
      .notNullable()
      .references("id")
      .inTable("missas")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamp("solicitado_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.boolean("entregue").defaultTo(false);
  });
}

exports.down = function (knex) {
  return knex.schema.dropTable("senhas");
}
