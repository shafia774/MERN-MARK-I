const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    name:{
        required:[true,'The field name cannot be empty'],
        type: String
    },
    code:{
        required:[true,'The field name cannot be empty'],
        type: String,
        unique: true
    }
})

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product