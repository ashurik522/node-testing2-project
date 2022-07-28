/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').truncate()
  await knex('items').insert([
    {id: 1, name: 'short sword', type: 'weapon', description: 'Quick attacking sword with low damage' },
    {id: 2, name: 'stone buckler', type: 'shield', description: 'Small shield made of stone, light defense' },
    {id: 3, name: 'reapers blad', type: 'weapon', description: 'Scythe with one hit kill property' }
  ]);
};
