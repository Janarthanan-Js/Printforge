import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-32 text-center">
      <p className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-widest">
        404
      </p>
      <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
      <p className="max-w-md mb-8 text-gray-600">
        The page you are looking for does not exist, or the model may have been
        removed from the library.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
        >
          Back home
        </Link>
        <Link
          href="/3d-models"
          className="px-5 py-2.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-full hover:border-black transition"
        >
          Browse models
        </Link>
      </div>
    </main>
  );
}
