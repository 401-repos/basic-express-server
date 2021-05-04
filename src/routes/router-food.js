'use strict';

const express = require('express');
const router = express.Router();
const Food = require('../models/model-food.js');
const data = new Food();

router.route('/food').get(handleGetFood).post(handlePostFood);
router.route('/food/:id').get(handleGetOneFood).put(handleUpdataFood).delete(handleDeleteFood);

function handleDeleteFood(req, res) {
    const id = parseInt(req.params.id)
    let deleting = data.delete(id);
    res.status(204).json({
        deleting
    });
}

function handleUpdataFood(req, res) {
    const id = parseInt(req.params.id)
    const newData = req.body;
    let updating = data.update(id,{...newData} );
    res.status(204).json({
        updating
    });
}

function handlePostFood(req, res) {
    let newItem = req.body;
    let posting = data.create({
        ...newItem
    });
    res.status(201).json({
        ...posting
    });
}

function handleGetOneFood(req, res) {
    const id = parseInt(req.params.id)
    let getting = data.get(id);
    res.status(200).json({
        ...getting
    });
}

function handleGetFood(req, res) {
    let getting = data.get();
    res.status(200).json({
        ...getting
    });
}

module.exports = router;