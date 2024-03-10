let trasactionHistory = [{ transaction: "1", amount: 1000 }];

let data1 = 0;
let data2 = 0;
let data3 = 0;

trasactionHistory.forEach((transaction) => {
  if (transaction.amount > 0 && transaction.amount <= 1000) {
    data1++;
  } else if (transaction.amount > 1000 && transaction.amount <= 10000) {
    data2++;
  } else if (transaction.amount > 10000 && transaction.amount <= 100000) {
    data3++;
  }
});

module.exports = trasactionHistory;
