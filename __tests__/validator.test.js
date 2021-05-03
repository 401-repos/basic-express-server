'use strict';

const validator = require('../src/middlewares/validator.js');

describe('Testing Validator', () => {
    let req = {name:'any name'};
    let res = {};
    let next = jest.fn();

    it('should invoke next if name exsists, not otherwise', () => {
        validator(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    it('should invoke next if name exsists, not otherwise', () => {
        req = {};
        validator(req, res, next);
        expect(next).toHaveBeenCalledWith('Name query not found');
    });
});