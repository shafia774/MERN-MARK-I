const mongoose = require("mongoose")


const database = async () =>{
  try{
    const con = await mongoose.connect("mongodb://127.0.0.1:27017/mern")
    console.log(`mongodb connected: ${con.connection.host}` )
  }catch(error){
    console.error(error)
  }
}

module.exports = database