const Product = require('../models/product');
const { default: axios } = require('axios');

async function seedDatabase(req, res, next) {
  try {
    // checking if the data is already exists in the database
    const existingData = await Product.find();
    if (existingData.length > 0) {
      console.log('Database already seeded. Skipping...');
      return res.json({ message: 'Database already seeded. Skipping...' });
    }

    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    res.send(data)
    
    // inserting data into the MongoDB databas
    await Product.insertMany(data)
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = seedDatabase;
