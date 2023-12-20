const express = require('express');
const router = express.Router();
const axios = require('axios');

exports.combinedData = async (req, res) => {
    try {
        const month = req.params.month;

        // Define the URLs for the three APIs
        const api1URL = `http://localhost:8080/api/transactions?month=${month}`;
        const api2URL = `http://localhost:8080/api/statistics/${month}`;
        const api3URL = `http://localhost:8080/api/pie-chart/${month}`;
        const api4URL = `http://localhost:8080/api/bar-chart/${month}`;

        // Make requests to the three APIs concurrently
        const [api1Response, api2Response, api3Response, api4Response] = await Promise.all([
            axios.get(api1URL),
            axios.get(api2URL),
            axios.get(api3URL),
            axios.get(api4URL),
        ]);

        // Combine the responses into a single JSON object
        const combinedData = {
            transactions: api1Response.data,
            statistics: api2Response.data,
            pieChart: api3Response.data,
            barChart: api4Response.data,
        };

        res.json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
