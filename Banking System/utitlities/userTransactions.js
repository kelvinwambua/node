const user = require("../data/user");
const { contacts, generateContact } = require("../data/contacts");
const {
  transactionHistory,
  generateRandomTransactionId,
} = require("../data/history");

const singleFundTransfer = (id, amount) => {
  if (user.balance > amount) {
    user.balance -= amount;
    let transactionStatus = "Unsuccessful";
    contacts.forEach((contact, index) => {
      if (contact.id === id) {
        contact.balance += amount;
        transactionStatus = "Successful";
        console.log("Transfer was", transactionStatus);
        console.log(contact.balance);
        generateRandomTransactionId();

        transactionHistory.push({
          id: id,
          transaction: "credit",
          amount: amount,
          reciever: contact.userName,
        });
      }
    });
    if (transactionStatus === "Unsuccessful") {
      console.log("User not found");
    }
  }
};
const withdraw = (amount) => {
  if (amount === 500 || amount === 1000) {
    user.balance = user.balance - amount;
    if (amount === 500) {
      console.log("Balance: " + user.balance);
      console.log(amount + " Withdrawn for groceries");
    } else if (amount === 1000) {
      console.log("Balance: " + user.balance);
      console.log(amount + " Withdrawn for your mother");
    }
    transactionHistory.push({
      transaction: "credit",
      amount: amount,
      reciever: "withdraw",
    });
  } else {
    console.log(
      "Please enter amount for Groceries or your mother(500 or 1000)"
    );
  }
};
const sequentialTransfer = (userNames, amounts) => {
  userNames.forEach((userName, index) => {
    let transactionStatus = "Unsuccessful";
    contacts.forEach((contact) => {
      if (contact.id === userName) {
        contact.balance += amounts[index];
        transactionStatus = "Successful";
        console.log("Transfer to", userName, "was", transactionStatus);
        console.log("New balance for", userName, ":", contact.balance);
        transactionHistory.push({
          transaction: "credit",
          amount: amounts[index],
          reciever: contact.userName,
        });
      }
    });
    if (transactionStatus === "Unsuccessful") {
      console.log("User not found for userName:", userName);
    }
  });
};

module.exports = { sequentialTransfer, singleFundTransfer, withdraw };
