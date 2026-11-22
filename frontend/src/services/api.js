const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("timeless_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.error || `HTTP ${res.status}: ${res.statusText}`;
      const error = new Error(errorMsg);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    console.warn(`[API Client] ${options.method || "GET"} ${endpoint} error:`, err.message);
    throw err;
  }
}

export const api = {
  // Authentication
  auth: {
    login: (email, password) =>
      apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    register: (name, email, password, phone = "", city = "Mumbai") =>
      apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, phone, city }),
      }),

    getMe: () => apiFetch("/auth/me"),

    updateProfile: (data) =>
      apiFetch("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    toggleWishlist: (watchId) =>
      apiFetch("/auth/wishlist/toggle", {
        method: "POST",
        body: JSON.stringify({ watchId }),
      }),
  },

  // Tasks REST API (Full CRUD)
  tasks: {
    getTasks: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiFetch(`/tasks${query ? `?${query}` : ""}`);
    },

    getTask: (id) => apiFetch(`/tasks/${id}`),

    createTask: (data) =>
      apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    updateTask: (id, data) =>
      apiFetch(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    deleteTask: (id) =>
      apiFetch(`/tasks/${id}`, {
        method: "DELETE",
      }),
  },

  // Watches Catalog
  watches: {
    getWatches: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiFetch(`/watches${query ? `?${query}` : ""}`);
    },

    getWatch: (id) => apiFetch(`/watches/${id}`),

    createWatch: (data) =>
      apiFetch("/watches", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  // Orders / Escrow Custody
  orders: {
    createOrder: (data) =>
      apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getOrders: () => apiFetch("/orders"),

    getOrder: (id) => apiFetch(`/orders/${id}`),
  },

  // Pre-Owned Valuations
  valuations: {
    createValuation: (data) =>
      apiFetch("/valuations", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getValuations: () => apiFetch("/valuations"),

    getValuation: (id) => apiFetch(`/valuations/${id}`),
  },
};
