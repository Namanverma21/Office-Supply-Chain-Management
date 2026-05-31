const express = require("express");
const { all, get, run } = require("../database");
const { authenticate, adminOnly } = require("../middleware");

const router = express.Router();

// GET /api/inventory — admin views inventory
router.get("/", authenticate, adminOnly, (req, res) => {
  const items = all("SELECT * FROM inventory ORDER BY item_name");
  res.json(items);
});

// GET /api/inventory/items — authenticated users get item name list (for suggestions)
router.get("/items", authenticate, (req, res) => {
  const items = all("SELECT item_name FROM inventory ORDER BY item_name");
  res.json(items.map((i) => i.item_name));
});

// PUT /api/inventory/:id — admin updates an inventory item
router.put("/:id", authenticate, adminOnly, (req, res) => {
  const { item_name, quantity } = req.body;

  if (!item_name || quantity === undefined || quantity === null) {
    return res.status(400).json({ error: "Item name and quantity are required." });
  }

  const qty = parseInt(quantity, 10);
  if (isNaN(qty) || qty < 0) {
    return res.status(400).json({ error: "Quantity must be a non-negative integer." });
  }

  const existing = get("SELECT * FROM inventory WHERE id = ?", [req.params.id]);
  if (!existing) {
    return res.status(404).json({ error: "Inventory item not found." });
  }

  // Check for name conflict with another item
  const conflict = get("SELECT * FROM inventory WHERE item_name = ? AND id != ?", [item_name.trim(), req.params.id]);
  if (conflict) {
    return res.status(400).json({ error: "Another item with that name already exists." });
  }

  run("UPDATE inventory SET item_name = ?, quantity = ? WHERE id = ?", [item_name.trim(), qty, req.params.id]);
  res.json({ message: "Inventory item updated." });
});

// POST /api/inventory — admin adds a new inventory item
router.post("/", authenticate, adminOnly, (req, res) => {
  const { item_name, quantity } = req.body;

  if (!item_name) {
    return res.status(400).json({ error: "Item name is required." });
  }

  const qty = parseInt(quantity || 0, 10);
  if (isNaN(qty) || qty < 0) {
    return res.status(400).json({ error: "Quantity must be a non-negative integer." });
  }

  const existing = get("SELECT * FROM inventory WHERE item_name = ?", [item_name.trim()]);
  if (existing) {
    return res.status(400).json({ error: "Item already exists." });
  }

  run("INSERT INTO inventory (item_name, quantity) VALUES (?, ?)", [item_name.trim(), qty]);
  res.json({ message: "Inventory item added." });
});

// DELETE /api/inventory/:id — admin deletes an inventory item
router.delete("/:id", authenticate, adminOnly, (req, res) => {
  const existing = get("SELECT * FROM inventory WHERE id = ?", [req.params.id]);
  if (!existing) {
    return res.status(404).json({ error: "Inventory item not found." });
  }

  run("DELETE FROM inventory WHERE id = ?", [req.params.id]);
  res.json({ message: "Inventory item deleted." });
});

module.exports = router;
