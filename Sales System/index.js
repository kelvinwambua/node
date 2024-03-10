const { ids, generateRandomId } = require("./data/ids");
const { contacts, generateContact } = require("./data/contacts");
const user = require("./data/user");
const { Sacco, Chama } = require("./groups");
const trasactionHistory = require("./data/history");

const singleFundTransfer = (name, amount) => {
  user.balance -= amount;
  let transactionStatus = "Unsuccessful";
  contacts.forEach((contact, index) => {
    if (contact.id === name) {
      contact.balance += amount;
      transactionStatus = "Successful";
      console.log("Transfer was", transactionStatus);
      console.log(contact.balance);
      trasactionHistory.push({
        transaction: "outgoing",
        amount: amount,
      });
    }
  });
  if (transactionStatus === "Unsuccessful") {
    console.log("User not found");
  }
};

const sequentialTransfer = (names, amounts) => {
  names.forEach((name, index) => {
    let transactionStatus = "Unsuccessful";
    contacts.forEach((contact) => {
      if (contact.id === name) {
        contact.balance += amounts[index];
        trasactionHistory.push({
          transaction: "outgoing",
          amount: amount,
        });
        transactionStatus = "Successful";
        console.log("Transfer to", name, "was", transactionStatus);
        console.log("New balance for", name, ":", contact.balance);
      }
    });
    if (transactionStatus === "Unsuccessful") {
      console.log("User not found for name:", name);
    }
  });
};

const groupTransfer = (group) => {
  console.log(JSON.stringify(group));
  if (group === Sacco) {
    group.forEach((member) => {
      member.balance = member.balance + 100;
    });
  } else if (group === Chama) {
    group.forEach((member) => {
      member.balance = member.balance + 500;
    });
  }
};
const withdraws = (amount) => {
  if (amount === 500 || amount === 1000) {
    user.balance = user.balance - amount;
    if (amount === 500) {
      console.log("Balance: " + user.balance);
      console.log(amount + " Withdrawn for groceries");
    } else if (amount === 1000) {
      console.log("Balance: " + user.balance);
      console.log(amount + " Withdrawn for your mother");
    }
    trasactionHistory.push({
      transaction: "outgoing",
      amount: amount,
    });
  } else {
    console.log(
      "Please enter amount for Groceries or your mother(500 or 1000)"
    );
  }
};
withdraws(35);
