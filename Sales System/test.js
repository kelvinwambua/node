let userAmount = 1000;
let user1Amount = 1000;

function singleTransfer(amount) {
  userAmount = userAmount - amount;
  user1Amount = user1Amount + amount;
  console.log(userAmount);
  console.log(user1Amount);
}
singleTransfer(100);
