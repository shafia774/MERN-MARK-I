const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    name:{
        required:[true,'The field `name` cannot be empty'],
        type: String
    },
    code:{
        required:[true,'The field `code` cannot be empty'],
        type: String,
        unique: true,
        validate: {
            validator: function (codeValue) {
                // Check if the code is exactly 7 digits
                return /^[A-Z0-9]{7}$/.test(codeValue);
            },
            message: 'The `code` field must contain exactly 7 letters or numbers.'
        }
    },
    coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    price:{
        required:[true,'The field `price` cannot be empty'],
        type: Number,
        unique: false,
    },
    quantity:{
        required:[true,'The field `quantity` cannot be empty'],
        type: Number,
        unique:false,
    },
    description:{
        type:String,
        trim:true
    },
    coverImage: {
        type: String,
        required: [true, 'A product must have a cover image']
      },
    images:[String],
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

ProductSchema.index({ coordinates: '2dsphere' });

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product;