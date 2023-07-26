const axios = require("axios");
const fetchStockRouter = require('express').Router()


fetchStockRouter.post('/', async (req, res) => {
    try {
        const { stockSymbol, date } = req.body;

        const apiKey = process.env.POLYGON_API_KEY || 'YOUR_POLYGON_API_KEY';
        const apiUrl = `https://api.polygon.io/v1/open-close/${stockSymbol}/${date}?apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);

        if (response.data.status !== 'OK') {
            return res.status(404).json({ error: 'Data not found.' });
        }

        // Extracting the required fields from the response
        const { open, high, low, close, volume } = response.data;

        return res.status(200).json({ open, high, low, close, volume });
    } catch (error) {
        // console.error(error);
        if (error.response.status === 404) {
            return res.status(404).json({ error: 'Data not found.' });
        }
        return res.status(500).json({ error: 'Internal server error.' });
    }
});



module.exports = fetchStockRouter