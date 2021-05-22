'use strinct';

const server = require('../src/server.js');
const test = require('supertest');
const {
    run
} = require('jest');
const testServer = test(server.app);

describe('Testing server', () => {

    let spyCons;
    beforeEach(() => {
        spyCons = jest.spyOn(console, 'log').mockImplementation();
        spyListen = jest.spyOn(server.app, 'listen').mockImplementation();
    });
    afterEach(() => {
        spyCons.mockRestore();
        spyListen.mockRestore();
    });

    it('should give status of 200 if name is there', async () => {
        const testSuccess = await testServer.get('/person?name=ali');
        expect(testSuccess.status).toEqual(200);
        expect(testSuccess.body).toEqual({
            name: 'ali'
        });
    });
    it('should give status of 500 if name is not provided', async () => {
        const test500 = await testServer.get('/person');
        expect(test500.status).toEqual(500);
    });
    it('should give status of 404 if route does not exsists', async () => {
        const test404 = await testServer.get('/bad');
        expect(test404.status).toEqual(404);
    });
    it('should give status of 404 if bad method', async () => {
        const test404 = await testServer.post('/person?name=ali');
        expect(test404.status).toEqual(404);
    });
    it('should give status of 200 if route success of home', async () => {
        const testSuccess = await testServer.get('/');
        expect(testSuccess.status).toEqual(200);
    });
    it('should tell the function has been called', () => {
        const port = 0;
        server.run(port);
        expect(spyListen).toHaveBeenCalled();
    });
    it('should give status of 200 if itemst sent back', async () => {
        const test200 = await testServer.get('/food');
        expect(test200.status).toEqual(200);
    });
    it('should give status of 200 if one item sent back', async () => {
        const test200 = await testServer.get('/food/1');
        expect(test200.status).toEqual(200);
    });
    it('should give status of 204 if item was deleted sucessefully', async () => {
        const test204 = await testServer.delete('/food/1');
        expect(test204.statusCode).toEqual(204);
    });
    it('should give status of 204 if item was deleted sucessefully', async () => {
            const test201 = await (testServer.post('/food').send({
                name: "newFood"
            }));
        const testGet = await testServer.get('/food');

        expect(test201.status).toEqual(201);
        expect(testGet.body[0].content.name).toEqual("newFood");
    });
    it('should give status of 204 if item was deleted sucessefully', async () => {
        const test201 = await (await testServer.put('/food/1'));
        expect(test201.statusCode).toEqual(204);
    });
    it('should give status of 200 if itemst sent back', async () => {
        const test200 = await testServer.get('/cloth');
        expect(test200.status).toEqual(200);
    });
    it('should give status of 200 if one item sent back', async () => {
        const test200 = await testServer.get('/cloth/1');
        expect(test200.status).toEqual(200);
    });
    it('should give status of 204 if item was deleted sucessefully', async () => {
        const test204 = await testServer.delete('/cloth/1');
        expect(test204.statusCode).toEqual(204);
    });
    it('should give status of 204 if item was deleted sucessefully', async () => {
        const test201 = await (await testServer.post('/cloth'));
        expect(test201.statusCode).toEqual(201);
    });
    it('should give status of 204 if item was deleted sucessefully', async () => {
        const test201 = await (await testServer.put('/cloth/1'));
        expect(test201.statusCode).toEqual(204);
    });
});
