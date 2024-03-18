const express = require('express');
const app = express();
const path = require('path');
const user = require("./data/user")
const {generateTransactionBreakdown,transactionHistory} = require("./data/history")

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const data = {user,transactionHistory};

app.get('/api/data', (req, res) => {
  res.json(data);
});


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(4000, () => {
  console.log('Backend server running on port 4000');
});
