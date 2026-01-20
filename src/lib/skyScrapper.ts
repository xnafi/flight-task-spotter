// lib/skyScrapper.ts
export async function searchFlights(params: {
  from: string
  to: string
  date: string
}) {
  const res = await fetch("https://api.skyscrapper.com/flights/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.SKY_SCRAPPER_API_KEY!
    },
    body: JSON.stringify(params),
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Flight search failed")
  }

  return res.json()
}
