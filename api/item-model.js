const db = require('../data/db-config')

function get() {
    return db('items')
}

function getById(id) {
    return db('items').where('id', id).first()
}

async function insert(item) {
    const [id] = await db('items').insert(item)
    return getById(id)
}

async function update(changes, id) {
    await db('items').update(changes).where('id', id)
    return getById(id)
}

async function remove(id) {
    const result = await getById(id)
    await db('items').delete(id).where('id', id)
    return result
}

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}