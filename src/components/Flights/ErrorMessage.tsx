export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-200 text-sm">
      <p className="font-bold mb-1">Search Failed</p>
      {message}
    </div>
  );
}
