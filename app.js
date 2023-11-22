
const express = require('express');
const app = express();

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
// const hpp = require('hpp');

const routes = require('./routes/routes');
const ErrorCall = require('./app/utils/ErrorCall');
const ErrorHandler = require('./app/handlers/ErrorHandler');


// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}
// Limit requests 
const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
//?????????????

// Prevent parameter pollution
// app.use(
// 	hpp({
// 	  whitelist: [
// 		'duration',
// 		'ratingsQuantity',
// 		'ratingsAverage',
// 		'maxGroupSize',
// 		'difficulty',
// 		'price'
// 	  ]
// 	})
//   );
  
// Calling routes
app.use(routes);

//handling undefined routes
app.all('*',(req,res,next)=>{
    next(new ErrorCall(`${req.originalUrl} does not exist`,404));
})

//initialise ErrroHandler
app.use(ErrorHandler);


module.exports = app;

