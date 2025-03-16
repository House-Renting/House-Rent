import { useState } from "react";

const SearchForm = ({ onSearch }: { onSearch: (search: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div>
        <label htmlFor="search" className="block text-sm font-medium">Search Properties</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Search by location or property name"
        />
      </div>

      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
    </form>
  );
};

export default SearchForm;
