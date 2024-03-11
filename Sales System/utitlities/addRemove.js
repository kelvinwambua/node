const { Sacco, Chama, removeUsers } = require("../data/groups")
const { ids, generateRandomId } = require("../data/ids")
const removeMember = (Group, id) => {
    const updatedGroup = Group.filter(member => member.id !== id);
    console.log(updatedGroup);
}
const addMember=(Group,username,balance)=>{
    const id = generateRandomId(8);
    const member={
      id:id,
      userName:username,
      balance: balance,
  
  
    }
    Group.push(member)
    console.log(Group)
  
  
  }
module.exports={addMember,removeMember}