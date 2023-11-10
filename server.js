require('dotenv').config();
const database = require('./config/database')

//in case of Uncaught Execption
// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
//   });

const app = require('./app');

//initialising the database
database()


const port = process.env.PORT || 3000;

//initialising the server 
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//in case of Unhandled Rejection
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  