import type { Metadata } from "next";
import Link from "next/link";
import ModelCard from "../components/ModelCard";
import SearchBar from "../components/SearchBar";
import { getModelStats, getSortOption, searchModels } from "../lib/models";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategoryCounts,
} from "../lib/categories";
import type { ModelsPageProps, SortOption } from "../types";

export const metadata: Metadata = {
  title: "Browse 3D Models",
  description:
    "Search and filter community-made 3D printing models by keyword, category and popularity.",
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most liked" },
  { value: "oldest", label: "Oldest" },
  { value: "name", label: "A-Z" },
];

function buildHref(params: {
  q?: string;
  category?: string;
  sort?: SortOption;
}) {
  const search = new URLSearchParams();

  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.sort && params.sort !== "newest") {
    search.set("sort", params.sort);
  }

  const queryString = search.toString();
  return queryString ? `/3d-models?${queryString}` : "/3d-models";
}

export default async function ModelsPage({ searchParams }: ModelsPageProps) {
  const { q = "", category = "", sort: rawSort } = await searchParams;
  const sort = getSortOption(rawSort);
  const query = q.trim();
  const models = searchModels({ query, category, sort });
  const categories = getAllCategories();
  const counts = getCategoryCounts();
  const activeCategory = getCategoryBySlug(category);
  const stats = getModelStats();

  const hasFilters = Boolean(query || category || rawSort);

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">All Models</h1>
        <p className="text-gray-600">
          Explore {stats.totalModels} community-made models across{" "}
          {stats.totalCategories} categories, ready to download and print.
        </p>
      </div>

      <SearchBar initialQuery={query} className="mb-6 max-w-2xl" />

      <section aria-label="Filter by category" className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href={buildHref({ q: query, sort })}
            className={`px-4 py-2 text-sm border rounded-full transition ${
              !category
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:border-black"
            }`}
          >
            All
          </Link>

          {categories.map((item) => {
            const isActive = category === item.slug;
            return (
              <Link
                key={item.slug}
                href={buildHref({ q: query, category: item.slug, sort })}
                className={`px-4 py-2 text-sm border rounded-full transition ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {item.displayName}
                <span
                  className={`ml-2 text-xs ${
                    isActive ? "text-gray-300" : "text-gray-400"
                  }`}
                >
                  {counts[item.slug] ?? 0}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col justify-between gap-4 pb-4 mb-6 border-b border-gray-200 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-600" role="status" aria-live="polite">
          {models.length} {models.length === 1 ? "model" : "models"}
          {query ? (
            <>
              {" "}
              for <span className="font-semibold text-gray-900">
                &ldquo;{query}&rdquo;
              </span>
            </>
          ) : null}
          {activeCategory ? (
            <>
              {" "}
              in{" "}
              <span className="font-semibold text-gray-900">
                {activeCategory.displayName}
              </span>
            </>
          ) : null}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase text-gray-500">
            Sort
          </span>
          <div className="flex flex-wrap gap-1">
            {sortOptions.map((option) => (
              <Link
                key={option.value}
                href={buildHref({
                  q: query,
                  category,
                  sort: option.value,
                })}
                className={`px-3 py-1.5 text-xs border rounded-full transition ${
                  sort === option.value
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-300 hover:border-black"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {models.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="region"
          aria-label="3D Models Gallery"
        >
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-gray-300 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold">No models found</h2>
          <p className="mb-6 text-gray-600">
            Try a different keyword or category, or clear your filters.
          </p>
          <Link
            href="/3d-models"
            className="inline-block px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
          >
            Clear filters
          </Link>
        </div>
      )}

      {hasFilters ? (
        <div className="mt-8">
          <Link
            href="/3d-models"
            className="text-sm text-gray-600 underline underline-offset-4 hover:text-black"
          >
            Reset all filters
          </Link>
        </div>
      ) : null}
    </div>
  );
}
