fetch("/api/data")
  .then((response) => response.json())
  .then((data) => {
    let informationContainer = document.querySelector(".infoContainer");
    let dashboard = document.querySelector(".Dashboard");
    let withdraw = document.querySelector(".Withdraw");
    let send = document.querySelector(".Send");
    let payments = document.querySelector(".Payments");

    dashboard.addEventListener("click", () => {
      clicked = "dashboard";
      console.log(clicked);
      displayInfo(data);
    });

    withdraw.addEventListener("click", () => {
      clicked = "withdraw";
      console.log(clicked);
      displayInfo(data);
    });

    send.addEventListener("click", () => {
      clicked = "send";
      console.log(clicked);
      displayInfo(data);
    });

    payments.addEventListener("click", () => {
      clicked = "payments";
      console.log(clicked);
      displayInfo(data);
    });
    function displayInfo(data) {
      let html = "";
      if (clicked === "dashboard") {
        let transList = "";
        data.transactionHistory.forEach((transaction, index) => {
          transList += `  <tr>
                  <td>${transaction.id}</td>
                  <td> ${transaction.receiver}</td>
                  <td>${transaction.transaction}</td>
                  <td>${transaction.Status}</td>
                  <td>${transaction.amount}</td>
                </tr>`;
        });
        let sendMoney = `
        <div class="sendMoney">
        <div class="material-symbols-outlined icon">
          send_money
          </div>
        <p>Send Money</p>
        </div>`;
        let withdrawMoney = `<div class="withdrawMoney">
        <div class="material-symbols-outlined icon">
        eject
      </div>
        <p>Withdraw Money</p>
        </div>`;
        let transactions = sendMoney + withdrawMoney;

        let transactionHTML = `<table class="transactions">
              <h3>Transaction History</h3>
              <tr>
                <th>Transaction ID</th>
                <th>Reciever</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                ${transList}
              </tr>`;
        let card1 = `
                  <div class="balance">
                      <p>Hello ${data.user.userName}</p>
                      <p class="actualBalance">Current Balance: ${data.user.balance}</p>
    
                  </div >`;
        html = card1 + transactions + transactionHTML;
      } else if (clicked === "withdraw") {
        let titlearea = `
        <div class="titleArea">
        <p class="withdrawStatement">Withdraw Money</p>
        <p class="catchPhrase">Move money between your Accounts</p>
        </div>`;
        let balanceCard = `<div class="balanceCard">
        <p>Hello ${data.user.userName}</p>
        <p class="actualBalance">Current Balance: ${data.user.balance}</p>
        </div>`;
        let withdrawCard = `<div class="withdrawCard"><div>Account Number</div><div>Amount</div><button>Withdraw</button><div><input></input></div><div><input></input><div></div>`;
        html = titlearea + balanceCard + withdrawCard;
      } else if (clicked === "send") {
        let titlearea = `<div class="titleArea">
        <h1>Send Money</h1>
        <h3>Make Payments to People and Businesses</h3>
        </div>`;
        let balanceCard = `<div class="balanceCard">
        <p>Hello ${data.user.userName}</p>
        <p class="actualBalance">Current Balance: ${data.user.balance}</p>
        </div>`;
        let transList = "";
        data.transactionHistory.forEach((transaction, index) => {
          transList += `  <tr>
                  <td>${transaction.id}</td>
                  <td> ${transaction.receiver}</td>
                  <td>${transaction.transaction}</td>
                  <td>${transaction.Status}</td>
                  <td>${transaction.amount}</td>
                </tr>`;
        });
        let transactionHTML = `<table class="transactions">
              <h3>Transaction History</h3>
              <tr>
                <th>Transaction ID</th>
                <th>Reciever</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                ${transList}
              </tr>`;
        html = titlearea + balanceCard + transactionHTML;
      }
      document.querySelector(".infoContainer").innerHTML = html;
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
