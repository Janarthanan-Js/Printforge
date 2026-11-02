import { FiSearch } from "react-icons/fi";

interface SearchFormProps {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export default function SearchForm({
  placeholder = "Search thousands of 3D models...",
  className = "",
  defaultValue = "",
}: SearchFormProps) {
  return (
    <form
      action="/3d-models"
      method="get"
      role="search"
      className={`relative ${className}`}
    >
      <FiSearch
        aria-hidden="true"
        className="absolute -translate-y-1/2 left-5 top-1/2 text-gray-400"
        size={20}
      />

      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label="Search 3D models"
        className="w-full py-4 pl-14 pr-32 text-base bg-white border border-gray-300 rounded-full shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
      />

      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
      >
        Search
      </button>
    </form>
  );
}
