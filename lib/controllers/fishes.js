const { Router } = require('express');
const Fish = require('../models/Fish')

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const response = await Fish.insert({ fishName: req.body.fishName, size: req.body.size, freshwater: req.body.freshwater, region: req.body.region });
            res.send(response); 
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const response = await Fish.getAll();
            res.send(response);
        } catch (error) {
            next(error);
        }
    })
    .get('/single/:id', async (req, res, next) => {
        try {
            const response = await Fish.getOne(req.params.id);
            res.send(response);
        } catch (error) {
            next(error);
        }
    })
    .put('/single/:id', async (req, res, next) => {
        try {
            const response = await Fish.changeOne({ column: req.body.column, value: req.body.value, id:req.params.id})
            res.send(response)
        } catch (error) {
            next(error)
        }
    })