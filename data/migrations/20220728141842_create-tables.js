
exports.up = function(knex) {
  return knex.schema
    .createTable('items', tbl => {
        tbl.increments()
        tbl.string('name', 32)
            .notNullable()
            .unique()
        tbl.string('type', 32)
            .notNullable()
        tbl.string('description')
            .notNullable()
    })
};


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('items')
};
