const mongoose= require("mongoose")
const colors= require("colors")

// function mongodb database connection
const connectDb = async() => {
  try {
    // establish connection through mongoose
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan);
        
  } catch (error) {
    console.log('DB error', error, colors.bgRed);
    
  }
}

module.exports = {connectDb}