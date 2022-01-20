//require library
const express = require('express');
const mongoose = require('mongoose');
//require resources
const { connectDB } = require('./config/db')
const route = require('./routes/index');

//connect database
console.log(connectDB());

const app = express();

//use middleware
app.use(express.json());

//routing
route(app);

const PORT = 5000;

app.listen(PORT, () => console.log(`server started on ports ${PORT}`));