const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')
const Items = require('./item-model')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

afterAll(async () => {
    await db.destroy()
})


beforeEach(async () => {
    await db('items').truncate()
    await db.seed.run()
})

describe('item-model tests', () => {
    test('[01]get()', async () => {
        let result = await Items.get()
        expect(result).toHaveLength(3)
        expect(result[0]).toEqual({ id: 1, name: 'short sword'})
    });
    test('[02]getById()', async () => {
        let result = await Items.getById(1)
        expect(result).toEqual({ id: 1, name: 'short sword'})

        result = await Items.getById(100)
        expect(result).not.toBeDefined()
    })
    test('[03]insert()', async () => {
        let result = await Items.insert({ name: 'battle axe'})
        expect(result).toEqual({ id:4, name: 'battle axe'})

        result = await Items.get()
        expect(result).toHaveLength(4)   
    })
    test('[04]update(changes, id)', async () => {
        let result = await Items.update({ name: 'long sword' }, 1)
        expect(result).toEqual({ name: 'long sword', id: 1})

        result = await Items.get()
        expect(result).toHaveLength(3)

        result = await Items.update({ name: 'long sword'}, 10)
        expect(result).not.toBeDefined()
    })
    test('[05]remove(id)', async () => {
        let result = await Items.remove(1)
        expect(result).toEqual({ id: 1, name: 'short sword'})

        result = await Items.get() 
        expect(result).toHaveLength(2)

        result = await Items.getById(1)
        expect(result).not.toBeDefined()
    })
})

describe('Endpoints Tests', () => {
    test('[01]has process.env.DB_ENV as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    test('[02]Get endpoint', async () => {
        let result = await request(server).get('/items')
        expect(result.body).toHaveLength(3)
        expect(result.body[0]).toEqual({ id: 1, name: 'short sword'})
        expect(result.status).toEqual(200)
    })
    test('[03]Get by id endpoint', async () => {
        let result = await request(server).get('/items/1')
        expect(result.body).toEqual({ id: 1, name: 'short sword'})

        result = await request(server).get('/items/10')
        expect(result.body).toMatchObject({ message: 'no item with this id'})
        expect(result.status).toEqual(404)
    })
    test('[04]Update endpoint', async () => {
        let result = await request(server).put('/items/1').send({ name: 'long sword'})
        expect(result.body).toEqual({ id: 1, name: 'long sword' })

        result = await request(server).get('/items')
        expect(result.body).toHaveLength(3)

        result = await request(server).put('/items/10').send({ name: 'long sword'})
        expect(result.body).toMatchObject({ message: 'no item with this id'})
        expect(result.status).toEqual(404)
    })
    test('[05]Post endpoint', async () => {
        let result = await request(server).post('/items').send({ name: 'battle axe'})
        expect(result.body).toEqual({ id: 4, name: 'battle axe' })
        expect(result.status).toBe(201)

        result = await request(server).get('/items')
        expect(result.body).toHaveLength(4) 
    })
    test('[06]Delete endpoint', async () => {
        let result = await request(server).delete('/items/1')
        expect(result.body).toEqual({ id: 1, name: 'short sword'})

        result = await request(server).get('/items')
        expect(result.body).toHaveLength(2)

        result = await request(server).delete('/items/1')
        expect(result.body).toEqual({ message: 'no item with this id'})
    })
});


