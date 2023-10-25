const Product = require('../models/Product')
const APIFeatures = require('./../helpers/ApiHelper');
const catchAsync = require('./../utils/CatchAsync')
const ErrorCall = require('./../utils/ErrorCall');

exports.getProducts = catchAsync( async (req,res,next) =>{
    const features = new APIFeatures(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .filterByLocation();
    const products = await features.query;

    // const products =  await Product.find()
    res.status(200).json({
        status:'success',
        results: products.length,
        data:{
            products
        }
    });
});

exports.getProduct = catchAsync( async (req,res,next) =>{
    const product =  await Product.findById(req.params.id)
    if (!product) {
        return  next(new ErrorCall(`couldn't find a product with id ${req.params.id}`,404));
    }
    res.status(200).json({
        status:'success',
        data:{
            product
        }
    })
});
// catchAsync();
exports.storeProduct = catchAsync( async (req,res,next) =>{
    const newProduct =  await  Product.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            product : newProduct
        }
    });
});

exports.updateProduct = catchAsync( async (req,res,next) =>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    });
    if (!product) {
        return  next(new ErrorCall(`couldn't find a product with id ${req.params.id}`,404));
    }
    res.status(200).json({
        status:'success',
        data:{
            product : product
        }
    });
});

exports.deleteProduct = catchAsync( async (req,res,next) =>{
    const product = await Product.findByIdAndDelete(req.params.id,{
        new: true,
        runValidators:true
    });
    if (!product) {
        return  next(new ErrorCall(`couldn't find a product with id ${req.params.id}`,404));
    }
    res.status(204).json({
        status:'success',
    });
});

exports.deleteAllProducts = catchAsync( async (req,res,next) =>{
    const product = await Product.deleteMany();
    res.status(204).json({
        status:'success',
    }); 
});

 