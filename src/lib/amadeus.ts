const TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";

export const FLIGHT_URL =
  "https://test.api.amadeus.com/v2/shopping/flight-offers";

let cachedToken: {
  accessToken: string;
  expiresAt: number;
} | null = null;

export async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.accessToken;
  }

  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Token Error Response:", error);
      throw new Error(`Failed to get access token: ${res.status}`);
    }

    const data = await res.json();

    if (!data.access_token) {
      throw new Error("No access token in response");
    }

    cachedToken = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in || 1800) * 1000,
    };

    return data.access_token;
  } catch (error) {
    console.error("Token Error:", error);
    throw error;
  }
}
