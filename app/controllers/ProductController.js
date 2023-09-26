const Product = require('../models/Product')
const express = require('express');
const app = express();

app.use(express.json());


exports.getProducts = async (req,res,next) =>{
    try {
        const products =  await Product.find({})
        res.status(200).json({
            status:'success',
            results: products.length,
            data:{
                products
            }
        })
    }catch(error){
        console.log(error)
    }
}

exports.getProduct = async (req,res,next) =>{
    try {
        const product =  await Product.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data:{
                product
            }
        })
    }catch(error){
        res.status(404).json({
            status: 'fail',
            message: err
          });
    }
}

exports.storeProduct = async (req,res,next) =>{
    try {
        const newProduct =  await  Product.create({
            name:req.body.name,
            code:req.body.code,
            price:req.body.price,
            coverImage:req.body.coverImage
        })
        res.status(201).json({
            status:'success',
            data:{
                product : newProduct
            }
        });
    }catch(err){
        res.status(400).json({
            status:'failed',
            message: err
        });
    }
}

exports.updateProduct = async (req,res,next) =>{
   try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
        });
        res.status(200).json({
            status:'success',
            data:{
                product : product
            }
        });
   }catch(err){
        res.status(400).json({
            status:'failed',
            message: err
        });
   }

}

exports.deleteProduct = async (req,res,next) =>{
    try{
         const product = await Product.findByIdAndDelete(req.params.id,{
             new: true,
             runValidators:true
         });
         res.status(200).json({
             status:'success',
         });
    }catch(err){
         res.status(400).json({
             status:'failed',
             message: err
         });
    }
 
 }