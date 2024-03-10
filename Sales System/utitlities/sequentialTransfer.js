const sequentialTransfer = (names, amounts) => {
  names.forEach((name, index) => {
    let transactionStatus = "Unsuccessful";
    contacts.forEach((contact) => {
      if (contact.id === name) {
        contact.balance += amounts[index];
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
