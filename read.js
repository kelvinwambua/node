const fs = require("fs");
const { parse } = require("csv-parse");
let knowledgeAndBeliefs = [];

function processData() {
  const stream = fs.createReadStream("./CSV/TB_HIV/HIV/Knowledge_and_beliefs_of_HIV.csv");

  stream.pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      let knowledgeandBeliefsStats = {
        Background: row[0],
        Agerange: row[1],
        Category: row[2],
        Percentage: row[3],
        Gender: row[4],
      };

      knowledgeAndBeliefs.push(knowledgeandBeliefsStats);
    })
    .on('error', function(err) {
      console.error('Error while reading the CSV file:', err);
    })
    .on('end', function() {
      console.log('CSV file has been processed.');
      //console.log(knowledgeAndBeliefs)
      getMaleData()
      getYouthData()
      getFemaleData()
      
    });
}
processData()

function getMaleData() {
  let maleData = knowledgeAndBeliefs.filter(data => data.Gender === "Men" && data.Background === "Age");
  
}
function getFemaleData(){
  let femaleData = knowledgeAndBeliefs.filter(data => data.Gender ==="Women" && data.Background === "Age");
  console.log(femaleData)
}

function getYouthData(){
  let youngData = knowledgeAndBeliefs.filter(data => data.Agerange === "15-19"|| data.Agerange ==="20-24"||data.Agerange==="25-29")
  
}
module.exports = youngData;