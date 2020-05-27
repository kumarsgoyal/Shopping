const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const categoryModel = mongoose.model('category', categorySchema);

categoryModel.addCategory = (req, callback) => {
    // console.log(req.body)
    categoryModel.create(req, callback)
}

categoryModel.getAllCategories = (req, callback) => {
    categoryModel.find({}, callback)
}

module.exports = categoryModel;