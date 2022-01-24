require('dotenv').config();
//require library
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//require resources
const { connectDB } = require('./config/db');
const route = require('./routes/index');

//connect database
console.log(connectDB());

const app = express();

//use middleware
app.use(express.json());
app.use(cors());

//routing
route(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ports ${PORT}`));
