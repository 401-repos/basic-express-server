'use strinct';

const server = require('../src/server.js');
const test = require('supertest');
const { run } = require('jest');
const testServer = test(server.app);

describe('Testing server', () => {

    let spyCons;
    beforeEach(() => {
        spyCons = jest.spyOn(console, 'log').mockImplementation();
    });
    afterEach(() => {
        spyCons.mockRestore();
    });

    it('should give status of 200 if name is there',async () => {
        const testSuccess = await testServer.get('/person?name=ali');
        expect(testSuccess.status).toEqual(200);
        expect(testSuccess.body).toEqual({ name: 'ali' });
    });
    it('should give status of 500 if name is not provided',async () => {
        const test500 = await testServer.get('/person');
        expect(test500.status).toEqual(500);
    });
    it('should give status of 404 if route does not exsists',async () => {
        const test404 = await testServer.get('/bad');
        expect(test404.status).toEqual(404);
    });
    it('should give status of 404 if bad method',async () => {
        const test404 = await testServer.post('/person?name=ali');
        expect(test404.status).toEqual(404);
    });
    it('should give status of 200 if route success of home',async () => {
        const testSuccess = await testServer.get('/');
        expect(testSuccess.status).toEqual(200);
    });

});