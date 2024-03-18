

fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        let informationContainer = document.querySelector(".infoContainer");
        let dashboard = document.querySelector(".Dashboard");
        let home = document.querySelector(".Home");
        let groups = document.querySelector(".Groups");
        let payments = document.querySelector(".Payments");

        dashboard.addEventListener("click", () => {
            clicked = "dashboard";
            console.log(clicked);
            displayInfo(data);
        });

        home.addEventListener("click", () => {
            clicked = "home";
            console.log(clicked);
            displayInfo(data);
        });

        groups.addEventListener("click", () => {
            clicked = "groups";
            console.log(clicked);
            displayInfo(data);
        });

        payments.addEventListener("click", () => {
            clicked = "payments";
            console.log(clicked);
            displayInfo(data);
        });
        function displayInfo(data) {
          let html = '';
          if (clicked === "dashboard") {
              let transList = "";
              data.transactionHistory.forEach((transaction) => {
                  // Assuming transaction has properties like amount, date, description
                  transList += `  <tr>
                  <td>${transaction.amount}</td>
                  <td> ${transaction.receiver}</td>
                  <td>${transaction.transaction}</td>
                </tr>`;
              });

              let transactionHTML = `<table class="transactions">
              <h3>Transactions</h3>
              <tr>
                <th>Amount</th>
                <th>Receiver</th>
                <th>Type</th>
                ${transList}
              </tr>`;
              let card1 = `
                  <div class="balance">
                      <h3>${data.user.userName}</h3>
                      <p>Current Balance: ${data.user.balance}</p>
                  </div >`;
              html = card1+transactionHTML;
              document.querySelector(".infoContainer").innerHTML = html;
          }
      }
      
    })
    .catch(error => console.error('Error fetching data:', error));
