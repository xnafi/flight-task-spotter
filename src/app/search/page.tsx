// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SearchPage({ searchParams }: any) {
  const params = await searchParams;
  return (
    <div>
      Searching flights from {params.from} to {params.to}
    </div>
  );
}
