const express = require('express')
const router = express.Router();
const Product = require('../models/product');
const seedDatabase = require('../seeders/seedData');
const { transactions } = require('./transactions');


router.get('/products', (req, res) => {
    res.send('it is working....')
})

router.get('/transactions', transactions)

// Seed the database route
router.use('/', seedDatabase);



module.exports = router;