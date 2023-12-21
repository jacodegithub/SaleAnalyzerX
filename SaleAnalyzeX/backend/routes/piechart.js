const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import your Product model

exports.pieChart = async (req, res) => {
    try {
        const monthName = req.params.month.toLowerCase();

        // Map month names to numerical values
        const monthMap = {
            'january': 1,
            'february': 2,
            'march': 3,
            'april': 4,
            'may': 5,
            'june': 6,
            'july': 7,
            'august': 8,
            'september': 9,
            'october': 10,
            'november': 11,
            'december': 12
        };

        // Convert month name to numerical value
        const monthNumber = monthMap[monthName];

        if (!monthNumber) {
            throw new Error('Invalid month name');
        }

        // Aggregate data for each category
        const categoryData = await Product.aggregate([
            {
                $match: {
                    sold: true,
                    dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, '0')}-` }
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(categoryData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
