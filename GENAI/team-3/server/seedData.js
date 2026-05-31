const bcrypt = require("bcryptjs");
const { get, run } = require("./database");

const demoUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "john", password: "john123", role: "employee" },
  { username: "jane", password: "jane123", role: "employee" },
];

const demoInventory = [
  { item_name: "Pens", quantity: 200 },
  { item_name: "Notebooks", quantity: 100 },
  { item_name: "Staplers", quantity: 30 },
  { item_name: "Sticky Notes", quantity: 150 },
  { item_name: "Markers", quantity: 80 },
  { item_name: "Paper Reams", quantity: 50 },
  { item_name: "Folders", quantity: 120 },
  { item_name: "Scissors", quantity: 25 },
  { item_name: "Tape Rolls", quantity: 60 },
  { item_name: "Envelopes", quantity: 300 },
];

function ensureSeedData() {
  const existingUser = get("SELECT id FROM users LIMIT 1");
  if (existingUser) {
    return false;
  }

  for (const user of demoUsers) {
    const hash = bcrypt.hashSync(user.password, 10);
    run("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)", [
      user.username,
      hash,
      user.role,
    ]);
  }

  for (const item of demoInventory) {
    run("INSERT INTO inventory (item_name, quantity) VALUES (?, ?)", [
      item.item_name,
      item.quantity,
    ]);
  }

  return true;
}

module.exports = { ensureSeedData, demoUsers };