import { useEffect, useState } from "react";
import { api } from "../api";

export default function EmployeeDashboard() {
  const [requests, setRequests] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const load = async () => {
    try {
      const data = await api.getMyRequests();
      setRequests(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    load();
    api.getInventoryItems().then(setInventoryItems).catch(() => {});
  }, []);

  const filtered = inventoryItems.filter((name) =>
    name.toLowerCase().includes(itemName.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.submitRequest(itemName, parseInt(quantity, 10), remarks);
      setMessage(res.message);
      setItemName("");
      setQuantity("");
      setRemarks("");
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const statusBadge = (status) => {
    const cls = {
      pending: "badge-warning",
      approved: "badge-success",
      rejected: "badge-danger",
    };
    return <span className={`badge ${cls[status]}`}>{status}</span>;
  };

  return (
    <div>
      <h2>Submit a Supply Request</h2>
      {message && <div className="alert">{message}</div>}
      <form className="request-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group autocomplete-wrapper">
            <label>Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => { setItemName(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Start typing to see suggestions..."
              required
            />
            {showSuggestions && itemName && filtered.length > 0 && (
              <ul className="suggestions-list">
                {filtered.map((name) => (
                  <li
                    key={name}
                    onMouseDown={() => { setItemName(name); setShowSuggestions(false); }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 10"
              required
            />
          </div>
          <div className="form-group">
            <label>Remarks (optional)</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Any notes..."
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
      </form>

      <h2>My Requests</h2>
      {requests.length === 0 ? (
        <p className="empty-state">No requests yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Rejection Reason</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.item_name}</td>
                <td>{r.quantity}</td>
                <td>{r.remarks || "—"}</td>
                <td>{statusBadge(r.status)}</td>
                <td>{r.rejection_reason || "—"}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
