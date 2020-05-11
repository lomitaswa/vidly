const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name'); 
    res.send(genres);
});
    
router.post('/', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) {        
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = new Genre({ name: req.body.name});

    await genre.save();
    res.send(genre);
});

router.put('/:id',[validateObjectId, auth], async (req, res) =>{
    const {error} = validate(req.body); 
    if(error) {
        return res.status(400).send(error.details[0].message);
    };
   
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name:req.body.name}, {
        new: true
    });

    if (!genre) 
        return res.status(404).send('The required ID NOT FOUND!!!');

    res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) =>{
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The required ID NOT FOUND!!!');

    res.send(genre);
});

router.get('/:id',validateObjectId ,async (req, res) => {
    
    const genre = await Genre.findById(req.params.id);

    if (!genre) res.status(404).send('The required ID NOT FOUND!!!');
    
    res.send(genre);
});


module.exports = router;