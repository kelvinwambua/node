let Sacco = [
  {
    id: "Alice",
    userName: "alice123",
    balance: 1000,
  },
  {
    id: "Bob",
    userName: "bob456",
    balance: 2000,
  },
  {
    id: "Charlie",
    userName: "charlie789",
    balance: 1500,
  },
  {
    id: "David",
    userName: "david123",
    balance: 1800,
  },
  {
    id: "Emma",
    userName: "emma456",
    balance: 2200,
  },
  {
    id: "Frank",
    userName: "frank789",
    balance: 1300,
  },
  {
    id: "Grace",
    userName: "grace123",
    balance: 1700,
  },
  {
    id: "Henry",
    userName: "henry456",
    balance: 2400,
  },
  {
    id: "Ivy",
    userName: "ivy789",
    balance: 1600,
  },
  {
    id: "Jack",
    userName: "jack123",
    balance: 2100,
  },
];
const Chama = [
  {
    id: "Katie",
    userName: "katie123",
    balance: 1100,
  },
  {
    id: "Liam",
    userName: "liam456",
    balance: 2200,
  },
  {
    id: "Mia",
    userName: "mia789",
    balance: 1300,
  },
  {
    id: "Noah",
    userName: "noah123",
    balance: 1700,
  },
  {
    id: "Olivia",
    userName: "olivia456",
    balance: 1900,
  },
  {
    id: "Patrick",
    userName: "patrick789",
    balance: 1400,
  },
  {
    id: "",
    userName: "quinn123",
    balance: 2000,
  },
  {
    id: "Rachel",
    userName: "rachel456",
    balance: 1500,
  },
];

function removeUsers(Group, number) {
  Group.splice(0, number);
  console.log("Remaining Members:");
  console.log(JSON.stringify(Group));
}

module.exports = { Sacco, Chama, removeUsers };
