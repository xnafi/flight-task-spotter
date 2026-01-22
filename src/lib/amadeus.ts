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
    const apiKey = process.env.AMADEUS_API_KEY;
    const apiSecret = process.env.AMADEUS_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error(
        "Amadeus API credentials not configured. Using mock data.",
      );
    }

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: apiSecret,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
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
    throw error;
  }
}
