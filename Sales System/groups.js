let Sacco = [
  {
    id: "Alice",
    userName: "alice123",
    phoneNumber: "123-456-7890",
    pin: "abc123",
    balance: 1000,
  },
  {
    id: "Bob",
    userName: "bob456",
    phoneNumber: "234-567-8901",
    pin: "def456",
    balance: 2000,
  },
  {
    id: "Charlie",
    userName: "charlie789",
    phoneNumber: "345-678-9012",
    pin: "ghi789",
    balance: 1500,
  },
  {
    id: "David",
    userName: "david123",
    phoneNumber: "456-789-0123",
    pin: "jkl012",
    balance: 1800,
  },
  {
    id: "Emma",
    userName: "emma456",
    phoneNumber: "567-890-1234",
    pin: "mno456",
    balance: 2200,
  },
  {
    id: "Frank",
    userName: "frank789",
    phoneNumber: "678-901-2345",
    pin: "pqr789",
    balance: 1300,
  },
  {
    id: "Grace",
    userName: "grace123",
    phoneNumber: "789-012-3456",
    pin: "stu123",
    balance: 1700,
  },
  {
    id: "Henry",
    userName: "henry456",
    phoneNumber: "890-123-4567",
    pin: "vwx456",
    balance: 2400,
  },
  {
    id: "Ivy",
    userName: "ivy789",
    phoneNumber: "901-234-5678",
    pin: "yz012",
    balance: 1600,
  },
  {
    id: "Jack",
    userName: "jack123",
    phoneNumber: "012-345-6789",
    pin: "123abc",
    balance: 2100,
  },
];
const Chama = [
  {
    id: "Katie",
    userName: "katie123",
    phoneNumber: "123-456-7890",
    pin: "abc123",
    balance: 1100,
  },
  {
    id: "Liam",
    userName: "liam456",
    phoneNumber: "234-567-8901",
    pin: "def456",
    balance: 2200,
  },
  {
    id: "Mia",
    userName: "mia789",
    phoneNumber: "345-678-9012",
    pin: "ghi789",
    balance: 1300,
  },
  {
    id: "Noah",
    userName: "noah123",
    phoneNumber: "456-789-0123",
    pin: "jkl012",
    balance: 1700,
  },
  {
    id: "Olivia",
    userName: "olivia456",
    phoneNumber: "567-890-1234",
    pin: "mno456",
    balance: 1900,
  },
  {
    id: "Patrick",
    userName: "patrick789",
    phoneNumber: "678-901-2345",
    pin: "pqr789",
    balance: 1400,
  },
  {
    id: "Quinn",
    userName: "quinn123",
    phoneNumber: "789-012-3456",
    pin: "stu123",
    balance: 2000,
  },
  {
    id: "Rachel",
    userName: "rachel456",
    phoneNumber: "890-123-4567",
    pin: "vwx456",
    balance: 1500,
  },
];

function removeUsers(group, number) {
  group.splice(0, number);
  console.log("Remaining Members:");
  console.log(JSON.stringify(group));
}

module.exports = { Sacco, Chama, removeUsers };
