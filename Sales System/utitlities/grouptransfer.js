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
