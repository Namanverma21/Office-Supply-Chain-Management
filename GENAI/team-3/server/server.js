const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { initDb } = require("./database");
const { ensureSeedData } = require("./seedData");
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const requestRoutes = require("./routes/requests");

const app = express();
const PORT = process.env.PORT || 5000;
const clientDistPath = path.resolve(__dirname, "../client/dist");
const hasClientBuild = fs.existsSync(clientDistPath);

app.use(cors());
app.use(express.json());

if (hasClientBuild) {
  app.use(express.static(clientDistPath));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/requests", requestRoutes);

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

if (hasClientBuild) {
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

// Init DB and start
async function start() {
  await initDb();
  const seeded = ensureSeedData();

  if (seeded) {
    console.log("Seeded demo data for first start.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
