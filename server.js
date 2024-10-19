const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (like index.html)
app.use(express.static('.'));

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url; // Get the target URL from the query string

    if (!targetUrl) {
        return res.status(400).send('No URL provided.');
    }

    try {
        // Send a request to the Ultraviolet backend
        const response = await axios.get(`https://ultraviolet.xyz/api?url=${encodeURIComponent(targetUrl)}`);
        res.send(response.data); // Send the response back to the user
    } catch (error) {
        console.error(error);
        res.status(500).send('Error accessing the requested URL.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
