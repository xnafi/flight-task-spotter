import { SearchBar } from "@/components/Search/SearchBar";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Welcome to Spotter</h1>
      <SearchBar />
    </div>
  );
}
