"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-32 text-center">
      <p className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-widest">
        Something went wrong
      </p>
      <h1 className="mb-4 text-4xl font-bold">We hit a snag</h1>
      <p className="max-w-md mb-8 text-gray-600">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-full hover:border-black transition"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
