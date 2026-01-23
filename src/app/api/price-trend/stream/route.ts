import { NextResponse } from "next/server";
import { getPriceTrend } from "@/lib/getPriceTrend";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const origin = searchParams.get("origin") ?? "JFK";
  const destination = searchParams.get("destination") ?? "LHR";
  const departureDate =
    searchParams.get("departureDate") ??
    new Date().toISOString().split("T")[0];

  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = async () => {
        try {
          const data = await getPriceTrend({
            origin,
            destination,
            departureDate,
          });

          controller.enqueue(
            `data: ${JSON.stringify(data)}\n\n`
          );
        } catch (err) {
          console.error("SSE price trend error:", err);
        }
      };

      // Initial push
      await sendUpdate();

      // Push updates every 30 seconds
      const interval = setInterval(sendUpdate, 30_000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
