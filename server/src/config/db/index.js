//connect database mongodb
const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://huunhon1015:huunhon989@mern-learnit.ittjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        console.log('connect database success !')
    } catch (error) {
        console.log("error connect database", error);
    }
}

module.exports = { connectDB }