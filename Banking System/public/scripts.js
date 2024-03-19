fetch("/api/data")
  .then((response) => response.json())
  .then((data) => {
    let informationContainer = document.querySelector(".infoContainer");
    let dashboard = document.querySelector(".Dashboard");
    let withdraw = document.querySelector(".Withdraw");
    let send = document.querySelector(".Send");
    let groups = document.querySelector(".Groups");
    let user = document.querySelector(".User");
    user.innerHTML=`        <span class="material-symbols-outlined">
    account_circle
    </span>
    <span class="material-symbols ">${data.user.userName}</span>`

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

    groups.addEventListener("click", () => {
      clicked = "Groups";
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
                      <p>Hello ${data.user.userName}👋</p>
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
        <p>Hello ${data.user.userName}👋</p>
        <p class="actualBalance">Current Balance: ${data.user.balance}</p>
        </div>`;
        let withdrawCard = `<div class="withdrawCard"><div>Account Number :</div><div>Amount :</div><button>Withdraw</button><div><input placeholder="1234523"></input></div><div><input placeholder="1000"></input></div></div>`;
        html = titlearea + balanceCard + withdrawCard;
      } else if (clicked === "send") {
        let titlearea = `<div class="titleArea">
        <p class="withdrawStatement">Send Money</p>
        <p class="catchPhrase">Make Payments to People and Businesses</h3>
        </div>`;
        let balanceCard = `<div class="balanceCard">
        <p>Hello ${data.user.userName}👋</p>
        <p class="actualBalance">Current Balance: ${data.user.balance}</p>
        </div>`;
        let sendCard=`<div class="sendCard"><div>Amount :</div><div><input class="amount" placeholder="1000"></input></div><button class="sendButton">Send Money</button></div>`
        let transList = "";
        data.contacts.forEach((contact, index) => {
          transList += `  <tr>
                  <td>${contact.id}</td>
                  <td>${contact.userName}</td>
                </tr>`;
        });
        let transactionHTML = `<table class="transactions2
        
        
        
        
        
        ">
              <h3 class="transactionTitle">Contacts</h3>
              <tr>
                <th>Contact ID</th>
                <th>Name</th>
                ${transList}
              </tr>`;
        html = titlearea + balanceCard + transactionHTML+sendCard;
      }else if(clicked==="Groups"){
        let saccoList=""
        data.Sacco.forEach((member, index) => {
          saccoList += `  <tr>
                  <td>${member.id}</td>
                  <td>${member.userName}</td>
                </tr>`;
        });
        let chamaList =""
        data.Chama.forEach((member, index) => {
          chamaList += `  <tr>
                  <td>${member.id}</td>
                  <td>${member.userName}</td>
                </tr>`;
        });
        let saccoHTML = `<table class="saccoTable"
        
        
        
        
        
        ">
              <h3 class="saccoTitle">Sacco Members</h3>
              <tr>
                <th>Contact ID</th>
                <th>Name</th>
                ${saccoList}
              </tr>`;
              let chamaHTML = `<table class="chamaTable"
              ">
                    <h3 class="chamaTitle">Chama Members</h3>
                    <tr>
                      <th>Contact ID</th>
                      <th>Name</th>
                      ${chamaList}
                    </tr>`;
                let addMember=`
     

                <div class="addCard">
                <div class=checkBox>
                <div>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
                </div>
                <div>
                <p> Sacco</label><br>
                </div>
                <div>
                  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
                </div>
                <div>
                  <label for="vehicle3"> Chama</label><br>
                </div>
                </div>
                <div >
                <div><p> Name:</div>
                <div><input class="input1"></div>
                <div><p> Balance:</div>
                <div><input  class="input1"></div>
                </div>
                <div><button class="addMemberButton">Add Member</button></div>
                </div>`
      html= saccoHTML+chamaHTML+addMember
        

      }
      document.querySelector(".infoContainer").innerHTML = html;
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
