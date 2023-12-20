const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes/routes')
require('dotenv').config()

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging middleware
app.use(bodyParser.json()); // JSON parsing middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.DATABASE)
.then(() => console.log("DB connected"))
.catch((error) => console.log(error));


// Routes
app.use('/api', router);

//port 
const port = process.env.PORT || 8080


app.listen(port, () => {
    console.log(`server running on port ${port}`)
})