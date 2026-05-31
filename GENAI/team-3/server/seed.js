const { initDb } = require("./database");
const { ensureSeedData, demoUsers } = require("./seedData");

async function seed() {
  await initDb();

  const seeded = ensureSeedData();

  if (seeded) {
    console.log("Database seeded successfully!");
  } else {
    console.log("Database already contains users. Skipping seed.");
  }

  console.log(
    `Users: ${demoUsers.map((user) => `${user.username}/${user.password}`).join(", ")}`
  );
}

seed();
