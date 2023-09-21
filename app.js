const express = require('express');
const app = express();
const database = require('./config/database')

require('dotenv').config();


app.use(express.json());

//Database
database()

const routes = require('./routes/routes');

// Use the routes as middleware
app.use(routes);



//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}..`))
