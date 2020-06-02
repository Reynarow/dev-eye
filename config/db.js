const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');




const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('mongo db connected')
    } catch (err) {
        console.log(err.message);
        //exit proccess with failure
        process.exit(1);
    }
}



module.exports = connectDB;