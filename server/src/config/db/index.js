require('dotenv').config();
//connect database mongodb
const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.ittjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        console.log('connect database success !')
    } catch (error) {
        console.log("error connect database", error);
    }
}

module.exports = { connectDB }