'use strict';

const logger = require('../src/middlewares/logger.js');

describe('Logger middleware function', () => {
    let req = {};
    let res = {};
    let consoleSpy;
    let next = jest.fn();
 
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    afterEach(() => {
        consoleSpy.mockRestore();
    });
    it('should test of the log function executes from the middleware', () => {
        logger(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

});