const Joi = require('joi')
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:25
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required:true,
        min: 10,
        max: 13
    }
});

const Customer = mongoose.model( 'Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(25).required(),
        phone: Joi.string().min(10).max(13).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;