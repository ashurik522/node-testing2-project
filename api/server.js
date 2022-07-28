const express = require('express')
const Items = require('./item-model')

const server = express()

server.use(express.json())

server.get('/items', async (req, res, next) => {
    try {
        const rows = await Items.get()
        res.status(200).json(rows)
    } catch(err) {
        next(err)
    }
    

})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server; 

