import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
}) {

  return (

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col md:flex-row gap-4">

      <div className="relative flex-1">

        <Search
          className="absolute left-4 top-3.5 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search websites..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >

        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Banking">Banking</option>
        <option value="Social">Social</option>

      </select>

    </div>

  );

}

export default SearchBar;