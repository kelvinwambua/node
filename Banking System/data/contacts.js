const contacts = [
  {
    id: "Alice",
    userName: "example",
    phoneNumber: "example",
    pin: "example",
    balance: 1000,
  },
  {
    id: "Keane",
    userName: "example",
    phoneNumber: "example",
    pin: "example",
    balance: 10000,
  },
  {
    id: "Tony",
    userName: "example",
    phoneNumber: "example",
    pin: "example",
    balance: 100,
  },
  {
    id: "Nuhayd",
    userName: "example",
    phoneNumber: "example",
    pin: "example",
    balance: 10000,
  },
  {
    id: "Leti",
    userName: "example",
    phoneNumber: "example",
    pin: "example",
    balance: 100,
  },
  {
    id: "Michelle",
    userName: "example",
    phoneNumber: "example",
    pin: "example",
    balance: 10000,
  },
  {
    id: "Ira",
    userName: "example",
    phoneNumber: "example",
    pin: "example",
    balance: 100,
  },
];
function generateContact(name, balance) {
  const id = generateRandomId(8);
  contact = {
    id: id,
    userName: name,
    phoneNumber: "",
    pin: "example",
    balance: balance,
  };
}
module.exports = { contacts, generateContact };
