const mongoose = require('mongoose');
const config = require('config');

 const db = config.get('mongoURI');




const connectDB = async () =>{
    try {
        await mongoose.connect(db , {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log("mongo db connected")
    } catch (error) {
        console.log(error.message);
    //exit proccess with failure
        process.exit(1);
    }
} 


module.exports = connectDB;



