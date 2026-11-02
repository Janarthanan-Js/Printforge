"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  initialQuery = "",
  placeholder = "Search models by name, description or category...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(initialQuery);
  const [lastInitialQuery, setLastInitialQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  if (initialQuery !== lastInitialQuery) {
    setLastInitialQuery(initialQuery);
    setValue(initialQuery);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const trimmed = value.trim();

      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      startTransition(() => {
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
          scroll: false,
        });
      });
    }, 350);

    return () => clearTimeout(timeout);
  }, [value, pathname, router]);

  return (
    <div className={`relative ${className}`}>
      <FiSearch
        aria-hidden="true"
        className="absolute -translate-y-1/2 left-4 top-1/2 text-gray-400"
        size={18}
      />

      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Search 3D models"
        className="w-full py-3 pl-11 pr-11 text-sm bg-white border border-gray-300 rounded-full outline-none focus:border-black focus:ring-1 focus:ring-black"
      />

      {value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute -translate-y-1/2 right-4 top-1/2 text-gray-400 hover:text-black"
        >
          <FiX size={18} />
        </button>
      ) : null}

      <span className="sr-only" role="status" aria-live="polite">
        {isPending ? "Updating results..." : ""}
      </span>
    </div>
  );
}
