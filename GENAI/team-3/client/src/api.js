const API_BASE = "/api";

function getHeaders() {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

export const api = {
  login: (username, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getInventory: () => request("/inventory"),

  getInventoryItems: () => request("/inventory/items"),

  updateInventoryItem: (id, item_name, quantity) =>
    request(`/inventory/${id}`, {
      method: "PUT",
      body: JSON.stringify({ item_name, quantity }),
    }),

  addInventoryItem: (item_name, quantity) =>
    request("/inventory", {
      method: "POST",
      body: JSON.stringify({ item_name, quantity }),
    }),

  deleteInventoryItem: (id) =>
    request(`/inventory/${id}`, { method: "DELETE" }),

  getMyRequests: () => request("/requests/my"),

  submitRequest: (item_name, quantity, remarks) =>
    request("/requests", {
      method: "POST",
      body: JSON.stringify({ item_name, quantity, remarks }),
    }),

  getPendingRequests: () => request("/requests/pending"),

  getRequestHistory: () => request("/requests/history"),

  approveRequest: (id) =>
    request(`/requests/${id}/approve`, { method: "POST" }),

  rejectRequest: (id, reason) =>
    request(`/requests/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),
};
