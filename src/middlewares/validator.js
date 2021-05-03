'use strict';

const e = require("express");

module.exports = (req, res, next) => {
    if (req.query && req.query.name) {
        next();
    } else {
        next('Name query not found');
    }
}