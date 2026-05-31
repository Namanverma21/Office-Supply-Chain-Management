import { useEffect, useState } from "react";
import { api } from "../api";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQty, setEditQty] = useState("");
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("");

  const load = () => {
    api.getInventory().then(setItems).catch((e) => setError(e.message));
  };

  useEffect(() => { load(); }, []);

  const flash = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.item_name);
    setEditQty(String(item.quantity));
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditQty("");
  };

  const saveEdit = async (id) => {
    try {
      const res = await api.updateInventoryItem(id, editName, parseInt(editQty, 10));
      flash(res.message);
      cancelEdit();
      load();
    } catch (err) {
      flash(err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const res = await api.addInventoryItem(newName, parseInt(newQty || "0", 10));
      flash(res.message);
      setNewName("");
      setNewQty("");
      load();
    } catch (err) {
      flash(err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}" from inventory?`)) return;
    try {
      const res = await api.deleteInventoryItem(id);
      flash(res.message);
      load();
    } catch (err) {
      flash(err.message);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Inventory Management</h2>
      </div>

      {message && <div className="alert">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="add-item-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New item name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input
          type="number"
          min="0"
          placeholder="Qty"
          value={newQty}
          onChange={(e) => setNewQty(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">+ Add Item</button>
      </form>

      {items.length === 0 ? (
        <p className="empty-state">No inventory items.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {editId === item.id ? (
                  <>
                    <td>
                      <input
                        className="edit-input"
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="edit-input edit-input-sm"
                        type="number"
                        min="0"
                        value={editQty}
                        onChange={(e) => setEditQty(e.target.value)}
                      />
                    </td>
                    <td>
                      <span className="badge badge-warning">editing</span>
                    </td>
                    <td className="actions">
                      <button className="btn btn-success btn-sm" onClick={() => saveEdit(item.id)}>Save</button>
                      <button className="btn btn-sm" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="item-name">{item.item_name}</td>
                    <td>
                      <span className={item.quantity <= 10 ? "stock-badge stock-low" : item.quantity <= 30 ? "stock-badge stock-med" : "stock-badge stock-ok"}>
                        {item.quantity}
                      </span>
                    </td>
                    <td>
                      {item.quantity === 0 ? (
                        <span className="badge badge-danger">Out of stock</span>
                      ) : item.quantity <= 10 ? (
                        <span className="badge badge-warning">Low stock</span>
                      ) : (
                        <span className="badge badge-success">In stock</span>
                      )}
                    </td>
                    <td className="actions">
                      <button className="btn btn-primary btn-sm" onClick={() => startEdit(item)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id, item.item_name)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
