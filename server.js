const express = require('express');
const fs = require('fs');
const csv = require('csv-parser')
const navigation = require('./root/navigation.js');
const CryptoJS = require('crypto-js');
const bodyParser = require('body-parser')
const crypto = require('crypto')
const GraphClass = require('./GraphClass.js')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const secretKey =crypto.randomBytes(32).toString('hex')

function encryptData(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decryptData(data) {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8)
  }

app.post('/files', (req, res) => {
  const results = [];
  const filePath = req.body.path
  // const filePath = decryptData(encryptedFilePath); 
  fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const graphClass = new GraphClass()
    parties = graphClass.groupDataByColumn({
      data: results,
      position: 2
    })
    const collection = []
    parties.groups.forEach(group => {
      const keys = Object.keys(group)
      const labelsandVariables = graphClass.getVariablesandLabels({
        data: group[keys[0]],
        colNames: parties.colNames,
        vPosition: 3,
        lPosition: 0
      })
      const genData = graphClass.generateDataStructure({
        data: group[keys[0]],
        ...labelsandVariables,
        varPosition: 3,
        valPosition: 2,
        colNames: parties.colNames,
      })
      collection.push(genData)
    })
    return res.json(collection)
  });
});
app.get('/navigation', (req, res) => {
  return res.status(200).json(navigation)
});
app.listen(4000, () => {
  console.log(`The sever is listening on http://127.0.0.1:4000 for requests.`)
});
