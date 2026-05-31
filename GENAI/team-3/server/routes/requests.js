const express = require("express");
const { all, get, run } = require("../database");
const { authenticate, adminOnly } = require("../middleware");

const router = express.Router();

// POST /api/requests — employee submits a request
router.post("/", authenticate, (req, res) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({ error: "Only employees can submit requests." });
  }

  const { item_name, quantity, remarks } = req.body;

  if (!item_name || !quantity) {
    return res.status(400).json({ error: "Item name and quantity are required." });
  }

  const qty = parseInt(quantity, 10);
  if (isNaN(qty) || qty <= 0) {
    return res.status(400).json({ error: "Quantity must be a positive integer." });
  }

  run(
    "INSERT INTO requests (employee_id, item_name, quantity, remarks) VALUES (?, ?, ?, ?)",
    [req.user.id, item_name.trim(), qty, remarks?.trim() || null]
  );

  res.status(201).json({ message: "Request submitted successfully." });
});

// GET /api/requests/my — employee's own requests
router.get("/my", authenticate, (req, res) => {
  const rows = all(
    "SELECT * FROM requests WHERE employee_id = ? ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json(rows);
});

// GET /api/requests/pending — admin views pending requests
router.get("/pending", authenticate, adminOnly, (req, res) => {
  const rows = all(
    `SELECT r.*, u.username AS employee_name
     FROM requests r JOIN users u ON r.employee_id = u.id
     WHERE r.status = 'pending'
     ORDER BY r.created_at ASC`
  );
  res.json(rows);
});

// GET /api/requests/history — admin views all request history
router.get("/history", authenticate, adminOnly, (req, res) => {
  const rows = all(
    `SELECT r.*, u.username AS employee_name
     FROM requests r JOIN users u ON r.employee_id = u.id
     ORDER BY r.created_at DESC`
  );
  res.json(rows);
});

// POST /api/requests/:id/approve
router.post("/:id/approve", authenticate, adminOnly, (req, res) => {
  const reqRow = get("SELECT * FROM requests WHERE id = ?", [req.params.id]);

  if (!reqRow || reqRow.status !== "pending") {
    return res.status(400).json({ error: "Request not found or already processed." });
  }

  const item = get("SELECT * FROM inventory WHERE item_name = ?", [reqRow.item_name]);
  if (!item) {
    return res.status(400).json({ error: `Item '${reqRow.item_name}' not found in inventory.` });
  }

  if (item.quantity < reqRow.quantity) {
    return res.status(400).json({
      error: `Insufficient stock. Available: ${item.quantity}, Requested: ${reqRow.quantity}.`,
    });
  }

  run("UPDATE inventory SET quantity = ? WHERE item_name = ?", [
    item.quantity - reqRow.quantity,
    reqRow.item_name,
  ]);
  run(
    "UPDATE requests SET status = 'approved', updated_at = datetime('now') WHERE id = ?",
    [req.params.id]
  );

  res.json({ message: "Request approved and inventory updated." });
});

// POST /api/requests/:id/reject
router.post("/:id/reject", authenticate, adminOnly, (req, res) => {
  const reqRow = get("SELECT * FROM requests WHERE id = ?", [req.params.id]);

  if (!reqRow || reqRow.status !== "pending") {
    return res.status(400).json({ error: "Request not found or already processed." });
  }

  const reason = req.body.reason?.trim() || null;
  run(
    "UPDATE requests SET status = 'rejected', rejection_reason = ?, updated_at = datetime('now') WHERE id = ?",
    [reason, req.params.id]
  );

  res.json({ message: "Request rejected." });
});

module.exports = router;
