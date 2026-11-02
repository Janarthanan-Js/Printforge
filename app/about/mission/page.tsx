import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Mission",
  description: "The mission behind PrintForge's 3D printing community.",
};

const values = [
  {
    title: "Open by default",
    description:
      "We believe knowledge and designs grow when they are shared. Creators can publish models for the whole community to learn from.",
  },
  {
    title: "Made for makers",
    description:
      "Every feature is designed around real printing workflows: search, filter, download and print without friction.",
  },
  {
    title: "Quality over noise",
    description:
      "Likes and categories help the best community designs rise to the top so you can spend more time printing.",
  },
];

export default function Mission() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Our mission
        </p>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">
          Make 3D printing accessible to everyone
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          PrintForge exists to remove the barriers between an idea and a printed
          object. We connect designers with makers, make discovery effortless,
          and keep the community at the centre of everything we build.
        </p>

        <div className="space-y-6">
          {values.map((value) => (
            <section
              key={value.title}
              className="p-6 border border-gray-200 rounded-xl"
            >
              <h2 className="mb-2 text-xl font-bold">{value.title}</h2>
              <p className="text-gray-600">{value.description}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-10">
          <Link
            href="/3d-models"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
          >
            Start exploring
          </Link>
          <Link
            href="/about"
            className="px-5 py-2.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-full hover:border-black transition"
          >
            Back to about
          </Link>
        </div>
      </div>
    </main>
  );
}
