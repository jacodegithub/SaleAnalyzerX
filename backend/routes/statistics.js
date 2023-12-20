const express = require('express');
const Product = require('./models/Product'); // Import your Product model

// API endpoint for statistics
exports.statistics = async (req, res) => {
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

        // Calculate statistics
        const totalSaleAmount = await Product.aggregate([
            {
                $match: {
                    sold: true,
                    dateOfSale: {
                        $regex: `-${monthNumber.toString().padStart(2, '0')}-`
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$price' }
                }
            }
        ]);

        const totalSoldItems = await Product.countDocuments({
            sold: true,
            dateOfSale: {
                $regex: `-${monthNumber.toString().padStart(2, '0')}-`
            }
        });

        const totalNotSoldItems = await Product.countDocuments({
            sold: false,
            dateOfSale: {
                $regex: `-${monthNumber.toString().padStart(2, '0')}-`
            }
        });

        res.json({
            totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
