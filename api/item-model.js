const db = require('../data/db-config')

function get() {
    return db('items')
}

module.exports = {
    get
}