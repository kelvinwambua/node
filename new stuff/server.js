const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const Graph = require('./graphClass')
const GenGraph = require('./genGraph')
const app = express();
const port = 3000;



const graph = new Graph();

app.get('/data', (req, res) => {
  const data = [];
  fs.createReadStream('Knowledge_and_beliefs_of_HIV.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      const categories = graph.groupedDataByColumn(data, 0);


    //   const { labels, variables } = graph.getVariablesandLabels({
    //     data,
    //     colNames: columnName,
    //     vPosition: 1,
    //     lPosition: 0,
    //   });

    //   const dataStructure = graph.generateDataStructure({
    //     data,
    //     labels,
    //     variables,
    //     varPosition: 1,
    //     colNames: columnName,
    //   });

      res.json(categories);
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
