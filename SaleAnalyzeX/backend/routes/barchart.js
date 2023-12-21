const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import your Product model

exports.barChart = async (req, res) => {
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

        // Define price ranges
        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity } // "Infinity" for prices above 900
        ];

        // Aggregate data for each price range
        const priceRangeData = await Promise.all(
            priceRanges.map(async ({ min, max }) => {
                const count = await Product.countDocuments({
                    sold: true,
                    price: { $gte: min, $lt: max },
                    dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, '0')}-` }
                });
                return { range: `${min}-${max}`, count };
            })
        );

        res.json(priceRangeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
