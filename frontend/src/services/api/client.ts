const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[apiClient] Failed fetching ${url}, falling back to mock service.`, error);
    throw error;
  }
}
