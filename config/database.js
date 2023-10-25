const mongoose = require("mongoose")


const database = async () =>{
  try{
    const con = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`mongodb connected: ${con.connection.host}` )
  }catch(error){
    console.error(error)
  }
}

module.exports = database