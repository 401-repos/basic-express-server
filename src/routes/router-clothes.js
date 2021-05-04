'use strict';

const express = require('express');
const router = express.Router();
const Clothes = require('../models/model-clothes.js');
const data = new Clothes();

router.route('/cloth').get(handleGetcloth).post(handlePostcloth);
router.route('/cloth/:id').get(handleGetOnecloth).put(handleUpdatacloth).delete(handleDeletecloth);

function handleDeletecloth(req, res) {
    const id = parseInt(req.params.id)
    let deleting = data.delete(id);
    res.status(204).json({
        deleting
    });
}

function handleUpdatacloth(req, res) {
    const id = parseInt(req.params.id)
    let updating = data.update(id);
    res.status(204).json({
        updating
    });
}

function handlePostcloth(req, res) {
    let newItem = req.body;
    let posting = data.create({
        ...newItem
    });
    res.status(201).json({
       ...posting
    });
}

function handleGetOnecloth(req, res) {
    const id = parseInt(req.params.id)
    let getting = data.get(id);
    res.status(200).json({
        ...getting
    });
}

function handleGetcloth(req, res) {
    let getting = data.get();
    res.status(200).json({
        ...getting
    });
}

module.exports = router;