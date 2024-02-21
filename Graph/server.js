const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const PORT = 3000;

app.use(express.static('.')); // Serve static files from the root directory

app.get('/data', (req, res) => {
    const results = [];
    fs.createReadStream('Knowledge_and_beliefs_of_HIV.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



