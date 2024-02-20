const express = require('express');
const app = express();
const countyInfo = require('./read');

app.get("/county-info", (req, res) => {
    res.json(countyInfo); // Send the countyInfo JSON data as response
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
