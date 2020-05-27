// const mongoose = require('./db');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var Client = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = ClientModel = mongoose.model("Client", Client)


