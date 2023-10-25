const express = require('express');
const app = express();


const routes = require('./routes/routes');
const ErrorCall = require('./app/utils/ErrorCall');
const ErrorHandler = require('./app/handlers/ErrorHandler');

app.use(express.json());


// Calling routes
app.use(routes);

//handling undefined routes
app.all('*',(req,res,next)=>{
    next(new ErrorCall(`${req.originalUrl} does not exist`,404));
})

//initialise ErrroHandler
app.use(ErrorHandler);


module.exports = app;

