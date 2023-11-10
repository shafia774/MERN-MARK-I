const User = require('../models/User')
const APIFeatures = require('./../helpers/ApiHelper');
const catchAsync = require('./../utils/CatchAsync')
const ErrorCall = require('./../utils/ErrorCall');


exports.getAllUsers = catchAsync( async (req,res,next) =>{
  const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .filterByLocation();
  const users = await features.query;

  // const products =  await Product.find()
  res.status(200).json({
      status:'success',
      results: users.length,
      data:{
          users
      }
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};