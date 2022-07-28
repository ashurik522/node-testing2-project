const request = require('supertest')
const server = require('./server')

describe('get /items', () => {
    test('[01]has process.env.DB_ENV as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    test('[02]returns 200 OK', () => {
        return request(server).get('/items')
        .expect(200)
    })
});


