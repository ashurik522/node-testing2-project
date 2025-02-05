/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').truncate()
  await knex('items').insert([
    {id: 1, name: 'short sword'},
    {id: 2, name: 'stone buckler'},
    {id: 3, name: 'reapers blade'}
  ]);
};
