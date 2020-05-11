const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log(`Connected to ${db}...`))
    .catch( err => console.log(`Could not connect to ${db}`, err));
}