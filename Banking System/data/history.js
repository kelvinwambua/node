let transactionHistory = [   { transaction: "credit", amount: 1000, receiver: "Kelvin" },
{ transaction: "debit", amount: 500, receiver: "Alice" },
{ transaction: "credit", amount: 750, receiver: "Bob" },
{ transaction: "debit", amount: 300, receiver: "Charlie" },
{ transaction: "credit", amount: 1200, receiver: "David" },
{ transaction: "debit", amount: 900, receiver: "Eve" },
{ transaction: "credit", amount: 800, receiver: "Frank" },
{ transaction: "debit", amount: 600, receiver: "Grace" },
{ transaction: "credit", amount: 1100, receiver: "Hannah" },
{ transaction: "debit", amount: 200, receiver: "Isaac" }];
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
  ">0<1000":data1,
  ">1000<10000":data2,
  ">10000<100000":data3,
}

console.table(transactionBreakdown)

}

module.exports = {generateTransactionBreakdown,transactionHistory}
