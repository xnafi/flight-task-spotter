import { searchParamsSchema } from "@/lib/validation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SearchPage({ searchParams }: any) {
  const params = await searchParams;

  const validation = searchParamsSchema.safeParse(params);

  if (!validation.success) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">Invalid Search Parameters</h1>
        <div className="mt-4 text-red-600">
          {validation.error.issues.map((err, idx) => (
            <p key={idx}>
              {err.path.join(".")}: {err.message}
            </p>
          ))}
        </div>
      </div>
    );
  }

  const data = validation.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Results</h1>
      <div className="mt-4 space-y-2">
        <p>
          <strong>From:</strong> {data.from}
        </p>
        <p>
          <strong>To:</strong> {data.to}
        </p>
        <p>
          <strong>Date:</strong> {data.date}
        </p>
        <p>
          <strong>Passengers:</strong> {data.p}
        </p>
        <p>
          <strong>Cabin:</strong> {data.cabin}
        </p>
        <p>
          <strong>Trip Type:</strong> {data.trip}
        </p>
        {data.return && (
          <p>
            <strong>Return Date:</strong> {data.return}
          </p>
        )}
      </div>
    </div>
  );
}
