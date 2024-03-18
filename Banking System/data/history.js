let transactionHistory = 
  [
    {
      id: "q45sZa1",
      transaction: "credit",
      amount: 1000,
      receiver: "Kelvin",
      Status: "completed",
    },
    {
      id: "pO9rXb2",
      transaction: "debit",
      amount: 500,
      receiver: "Alice",
      Status: "completed",
    },
    {
      id: "mN8uCc3",
      transaction: "credit",
      amount: 750,
      receiver: "Bob",
      Status: "completed",
    },
    {
      id: "eK7tYd4",
      transaction: "debit",
      amount: 300,
      receiver: "Charlie",
      Status: "completed",
    },
    {
      id: "lM6zFe5",
      transaction: "credit",
      amount: 1200,
      receiver: "David",
      Status: "completed",
    },
    {
      id: "jP5wGf6",
      transaction: "debit",
      amount: 900,
      receiver: "Eve",
      Status: "completed",
    },
    {
      id: "sQ4vHg7",
      transaction: "credit",
      amount: 800,
      receiver: "Frank",
      Status: "completed",
    },
    {
      id: "rN3uIh8",
      transaction: "debit",
      amount: 600,
      receiver: "Grace",
      Status: "completed",
    },
    {
      id: "oM2tJi9",
      transaction: "credit",
      amount: 1100,
      receiver: "Hannah",
      Status: "completed",
    },
    {
      id: "wK1sLj0",
      transaction: "debit",
      amount: 200,
      receiver: "Isaac",
      Status: "completed",
    },
  ]
let data1 = 0;
let data2 = 0;
let data3 = 0;
function generateRandomTransactionId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  let isUnique = false;

  do {
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    isUnique = !ids.includes(result);

    if (!isUnique) {
      result = "";
    }
  } while (!isUnique);
  ids.push(result);

  return result;
}
function generateTransactionBreakdown() {
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
    ">0<1000": data1,
    ">1000<10000": data2,
    ">10000<100000": data3,
  };

  console.table(transactionBreakdown);
}

module.exports = {
  generateTransactionBreakdown,
  transactionHistory,
  generateRandomTransactionId,
};
