const {addMember,removeMember} = require("./utitlities/addRemove")
const groupTransfer = require("./utitlities/grouptransfer")
const { Sacco, Chama, removeUsers } = require("./data/groups")
const {sequentialTransfer,singleFundTransfer,withdraw}= require("./utitlities/userTransactions")
const transactionHistory = require("./data/history")

addMember(Sacco,"kelvinwambua",5000)// Group(Sacco or Chama) ,  username wanted, amount in account
removeMember(Sacco,"Ivy")//Takes the Group(Sacco or Chama) and the id of the member
removeUsers(Sacco,6)//username and number of members to be removed
groupTransfer(Sacco)//Takes the group name
singleFundTransfer("Alice",2000)// takes the user's id and the amount
sequentialTransfer(["Alice","Keane"], [1000,2000])//takes and array of user Ids and amounts
withdraw(1000)//Takes 500(for groceries) or 1000(for mother)
console.log(transactionHistory)

     




