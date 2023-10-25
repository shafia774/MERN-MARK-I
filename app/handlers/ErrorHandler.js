const ErrorCall = require('./../utils/ErrorCall');

const handleCastErrorDB = err => {
   const message = `Invalid ${err.path}: ${err.value}.`;
   return new ErrorCall(message, 400);
};

const handleDuplicateFieldsDB = err => {
   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
   console.log(value);

   const message = `Duplicate field value: ${value}. Please use another value!`;
   return new ErrorCall(message, 400);
};

const handleValidationErrorDB = err => {
  const issues = {};

  

  for (const key in err.errors) {
    if (err.errors[key].name === 'CastError') {
      issues[key] = `The field \`${key}\` can only be a ${err.errors[key].kind}`;
    } else {
      issues[key] = err.errors[key].message;
    }
  }


   const message = `Invalid input data`;

   return new ErrorCall(message,400,issues);
};


const sendErrorDev = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
   });
};
 
const sendErrorProd = (err, res) => {

   if (err.isOperational) {
      const response = {
         status: err.status,
         message: err.message,
      };
      if (err.issues) {
         response.problems = err.issues;
      }
      res.status(err.statusCode).json(response);

   } else {
      console.error('ERROR 💥', err);
      res.status(500).json({
         status: err,
         message: 'Something went wrong!'
      });
   }
};
 
module.exports = (err, req, res, next) => {
   // console.log(err.stack);
 
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (process.env.NODE_ENV === 'DEVELOPMENT') {
      sendErrorDev(err, res);
   } else if (process.env.NODE_ENV === 'PRODUCTION') {
      if (err.name === 'CastError') err = handleCastErrorDB(err);
      if (err.code === 11000) err = handleDuplicateFieldsDB(err);
      if (err.name === 'ValidationError') err = handleValidationErrorDB(err);


      sendErrorProd(err, res);
   }
 };