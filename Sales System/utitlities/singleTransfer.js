const { ids, generateRandomId } = require("./data/ids");
const { contacts, generateContact } = require("./data/contacts");
const user = require("./data/user");
const trasactionHistory = require("../data/history");

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
