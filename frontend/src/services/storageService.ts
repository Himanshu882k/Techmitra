import type { Inquiry, InquiryStatus } from "../types";

const API_BASE =
  import.meta.env.VITE_API_BASE || window.location.origin;

const ADMIN_TOKEN_KEY = "tm_admin_token"; // unified token name

// Always returns valid HeadersInit
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleJson(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (data && (data.message as string)) || "Request failed";
    throw new Error(message);
  }
  return data;
}

export const storageService = {
  async saveInquiry(payload: {
    name: string;
    phone: string;
    serviceName: string;
    notes?: string;
  }): Promise<boolean> {
    const res = await fetch(`${API_BASE}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await handleJson(res);
    return !!data.ok;
  },

  async verifyAdmin(password: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await handleJson(res);
    if (data.ok && data.token) {
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token as string);
      return true;
    }
    return false;
  },

  setAdminToken(token: string) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  },

  clearAdminToken() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  },

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem(ADMIN_TOKEN_KEY);
  },

  async getInquiries(): Promise<Inquiry[]> {
    const res = await fetch(`${API_BASE}/api/admin/inquiries`, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
      },
    });
    const data = await handleJson(res);
    return (data.inquiries || []) as Inquiry[];
  },

  async updateStatus(id: string, status: InquiryStatus): Promise<boolean> {
    const res = await fetch(`${API_BASE}/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const data = await handleJson(res);
    return !!data.ok;
  },
};
