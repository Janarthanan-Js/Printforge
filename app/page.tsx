import Image from "next/image";
import Link from "next/link";
import ModelCard from "./components/ModelCard";
import SearchForm from "./components/SearchForm";
import { getFeaturedModels, getModelStats } from "./lib/models";
import { getAllCategories, getCategoryCounts } from "./lib/categories";

const popularSearches = [
  { label: "Dragons", href: "/3d-models?q=dragon" },
  { label: "Household", href: "/3d-models?category=household" },
  { label: "Cosplay", href: "/3d-models?category=props-cosplay" },
  { label: "Tools", href: "/3d-models?category=tools" },
];

export default function Home() {
  const featuredModels = getFeaturedModels(4);
  const stats = getModelStats();
  const categories = getAllCategories();
  const counts = getCategoryCounts();

  return (
    <main>
      <section className="px-6 py-12 mx-auto max-w-7xl md:py-20">
        <div className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
              Your go-to platform for 3D printing files
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Discover what&apos;s possible with 3D Printing
            </h1>

            <p className="max-w-xl text-lg text-gray-600">
              Join our community of creators and explore a vast library of
              user-submitted models, ready to download and print.
            </p>

            <SearchForm className="max-w-xl" />

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-500">Popular:</span>
              {popularSearches.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/3d-models"
                className="px-6 py-3 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
              >
                Browse Models
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 text-sm font-semibold text-gray-900 border-2 border-black rounded-full hover:bg-black hover:text-white transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <Image
              src="/printforge.png"
              alt="A collection of 3D printed models"
              width={500}
              height={500}
              className="w-full max-w-md object-contain"
              priority
            />
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-4 max-w-2xl pt-12 mt-12 border-t border-gray-200">
          <div>
            <dt className="text-sm text-gray-500">Models</dt>
            <dd className="text-2xl font-bold">{stats.totalModels}+</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Categories</dt>
            <dd className="text-2xl font-bold">{stats.totalCategories}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Community likes</dt>
            <dd className="text-2xl font-bold">
              {stats.totalLikes.toLocaleString()}
            </dd>
          </div>
        </dl>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-widest">
                Browse by category
              </p>
              <h2 className="text-3xl font-bold">Find your next project</h2>
            </div>
            <Link
              href="/3d-models"
              className="text-sm text-gray-600 underline underline-offset-4 hover:text-black"
            >
              See everything
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/3d-models?category=${category.slug}`}
                className="flex items-center justify-between px-5 py-4 bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-sm transition"
              >
                <span className="font-medium">{category.displayName}</span>
                <span className="text-xs text-gray-400">
                  {counts[category.slug] ?? 0}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-widest">
              Community favourites
            </p>
            <h2 className="text-3xl font-bold">Most liked models</h2>
          </div>
          <Link
            href="/3d-models?sort=popular"
            className="text-sm text-gray-600 underline underline-offset-4 hover:text-black"
          >
            View all popular
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>

      <section className="px-6 pb-8 mx-auto max-w-7xl">
        <div className="px-8 py-12 text-center text-white bg-gray-950 rounded-2xl">
          <h2 className="mb-3 text-3xl font-bold">Have a model to share?</h2>
          <p className="max-w-xl mx-auto mb-6 text-gray-400">
            PrintForge is built by makers. Join the community and help others
            bring their ideas to life.
          </p>
          <Link
            href="/3d-models"
            className="inline-block px-6 py-3 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition"
          >
            Explore the library
          </Link>
        </div>
      </section>
    </main>
  );
}
