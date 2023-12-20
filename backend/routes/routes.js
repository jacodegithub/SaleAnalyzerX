const express = require('express')
const router = express.Router();
const Product = require('../models/product');
const seedDatabase = require('../seeders/seedData');
const { transactions } = require('./transactions');
const { statistics } = require('./statistics');
const { barChart } = require('./barchart');
const { pieChart } = require('./piechart');
const { combinedData } = require('./combinedData');


router.get('/products', (req, res) => {
    res.send('it is working....')
})

// transactions router api
router.get('/transactions', transactions)

// statistics router api
router.get('/statistics/:month', statistics)

// bar-chart router api
router.get('/bar-chart/:month', barChart)

// pie-chart router api
router.get('/pie-chart/:month', pieChart)

// combined-data router api
router.get('/combined-data/:month', combinedData)


// Seed the database route
router.use('/', seedDatabase);



module.exports = router;