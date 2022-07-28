
exports.up = function(knex) {
  return knex.schema
    .createTable('items', tbl => {
        tbl.increments()
        tbl.string('name', 32)
            .notNullable()
            .unique()
    })
};


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('items')
};
