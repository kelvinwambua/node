let transactionHistory = [];
let data1 = 0;
let data2 = 0;
let data3=0;
function generateTransactionBreakdown(){


transactionHistory.forEach((transaction) => {
  if (transaction.amount > 0 && transaction.amount <= 1000) {
    data1++;
  } else if (transaction.amount > 1000 && transaction.amount <= 10000) {
    data2++;
  } else if (transaction.amount > 10000 && transaction.amount <= 100000) {
    data3++;
  }
});

let transactionBreakdown = {
  under1000:data1,
  under10000:data2,
  under100000:data3,
}

console.table(transactionBreakdown)

}

module.exports = {generateTransactionBreakdown,transactionHistory}
