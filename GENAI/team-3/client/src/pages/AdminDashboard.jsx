import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const data = await api.getPendingRequests();
      setPending(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    setMessage("");
    try {
      const res = await api.approveRequest(id);
      setMessage(res.message);
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleReject = async (id) => {
    setMessage("");
    try {
      const res = await api.rejectRequest(id, reason);
      setMessage(res.message);
      setRejectId(null);
      setReason("");
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {message && <div className="alert">{message}</div>}
      {pending.length === 0 ? (
        <p className="empty-state">No pending requests.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Remarks</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.employee_name}</td>
                <td>{r.item_name}</td>
                <td>{r.quantity}</td>
                <td>{r.remarks || "—"}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(r.id)}
                  >
                    Approve
                  </button>
                  {rejectId === r.id ? (
                    <div className="reject-form">
                      <input
                        type="text"
                        placeholder="Reason (optional)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleReject(r.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => { setRejectId(null); setReason(""); }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => setRejectId(r.id)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
