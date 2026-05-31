import { useEffect, useState } from "react";
import { api } from "../api";

export default function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getRequestHistory().then(setRequests).catch((e) => setError(e.message));
  }, []);

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
      <h2>Request History</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {requests.length === 0 ? (
        <p className="empty-state">No requests found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Rejection Reason</th>
              <th>Requested</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.employee_name}</td>
                <td>{r.item_name}</td>
                <td>{r.quantity}</td>
                <td>{r.remarks || "—"}</td>
                <td>{statusBadge(r.status)}</td>
                <td>{r.rejection_reason || "—"}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
                <td>{new Date(r.updated_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
