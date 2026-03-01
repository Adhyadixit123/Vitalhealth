const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const errorMessage = body?.error || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

export const createLead = async (payload: {
  fullName: string;
  email: string;
  phone?: string;
  role?: string;
  message?: string;
}) => {
  const data = await apiRequest<{ data: unknown }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data.data;
};

export const fetchLeads = async (token: string) => {
  const data = await apiRequest<{ data: Lead[] }>("/api/leads", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const leadsQuery = (token: string) => ({
  queryKey: ["leads", token],
  queryFn: () => fetchLeads(token),
});

export const adminLogin = async (payload: { email: string; password: string }) => {
  const data = await apiRequest<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data.token;
};

export type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string | null;
  message: string | null;
  created_at: string;
};
