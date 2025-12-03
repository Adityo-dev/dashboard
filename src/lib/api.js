const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiPost(endpoint, body) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error. Try again later." };
  }
}
