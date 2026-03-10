const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${base}${normalizedPath}` || normalizedPath, {
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
  const data = await apiRequest<{ data: unknown }>("/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data.data;
};

export const fetchPublicMedia = async (params?: { section?: string; limit?: number }) => {
  const searchParams = new URLSearchParams();
  if (params?.section) {
    searchParams.set("section", params.section);
  }
  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }

  const path = `/media/public${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const data = await apiRequest<{ data: MediaItem[] }>(path);
  return data.data;
};

export const fetchLeads = async (token: string) => {
  const data = await apiRequest<{ data: Lead[] }>("/leads", {
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
  const data = await apiRequest<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data.token;
};

export type MediaItem = {
  id: string;
  heading: string;
  description: string | null;
  section: string | null;
  position: number | null;
  image_url: string;
  public_id: string | null;
  created_at: string;
};

export const fetchMedia = async (token: string) => {
  const data = await apiRequest<{ data: MediaItem[] }>("/media", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};

export const mediaQuery = (token: string) => ({
  queryKey: ["media", token],
  queryFn: () => fetchMedia(token),
  enabled: Boolean(token),
});

export const createMedia = async (
  token: string,
  payload: {
    heading: string;
    description?: string;
    section?: string;
    position?: number;
    imageUrl: string;
    publicId?: string;
  },
) => {
  const data = await apiRequest<{ data: MediaItem }>("/media", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return data.data;
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
