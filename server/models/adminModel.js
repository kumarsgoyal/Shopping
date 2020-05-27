const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var Admin = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = AdminModel = mongoose.model("Admin", Admin)