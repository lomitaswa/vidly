const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch( err => console.log('Could not connect to MongoDB', err));
}