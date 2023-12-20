const Product = require('../models/product')


exports.transactions = async (req, res) => {
    try {

        const { page = 1, perPage = 10, search = '', month } = req.query;
        // console.log(req.body)
        // Map month names to numerical values
        console.log('search ', search)
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
    
        // If month is provided, add it to the query
        const monthQuery = month ? {
            dateOfSale: {
                $regex: `-${monthMap[month.toLowerCase()].toString().padStart(2, '0')}-`
            }
        } : {};

        // Construct the search query
        const searchQuery = {
            $or: [
                { title: { $regex: search, $options: 'i' } }, // Case-insensitive title search
                { description: { $regex: search, $options: 'i' } }, // Case-insensitive description search
                { price: { $gte: parseFloat(search) || 0 } } // Case-insensitive price search
            ]
        };

        // Merge the month and search queries
        const combinedQuery = { ...monthQuery, ...searchQuery };

        // Perform the find operation with pagination
        const pageValue = Math.max(1, parseInt(page));
        const result = await Product.find(combinedQuery)
            .skip((pageValue - 1) * perPage)
            .limit(parseInt(perPage));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}