const express = require('express')
const Items = require('./item-model')

const server = express()

server.use(express.json())

server.get('/items', async (req, res, next) => {
    try {
        const items = await Items.get()
        res.status(200).json(items)
    } catch(err) {
        next(err)
    }
})

server.get('/items/:id', async (req, res, next) => {
    try{
        const item = await Items.getById(req.params.id)
        if(item){
            res.status(200).json(item)
        } else {
            res.status(404).json({ message: 'no item with this id' })
        }
    } catch(err){
        next(err)
    }
})

server.put('/items/:id', async (req, res, next) => {
    try{
        const item = await Items.update(req.body, req.params.id)
        if(item){
            res.status(200).json(item)
        } else {
            res.status(404).json({ message: 'no item with this id' })
        }
    } catch(err) {
        next(err)
    }
})

server.post('/items', async (req, res, next) => {
    try {
        const item = await Items.insert(req.body)
        res.status(201).json(item)
    } catch(err) {
        next(err)
    }
})

server.delete('/items/:id', async (req, res, next) => {
    try{
        const item = await Items.remove(req.params.id)
        if(item){
            res.status(200).json(item)
        } else {
            res.status(404).json({ message: 'no item with this id' })
        }
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

