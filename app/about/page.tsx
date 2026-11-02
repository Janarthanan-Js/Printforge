import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "PrintForge is a community platform for discovering and sharing 3D printing models.",
};

const statistics = [
  {
    title: "100K+ Models",
    description:
      "Access our vast library of community-created 3D models for every skill level.",
  },
  {
    title: "Active Community",
    description:
      "Join thousands of makers who share tips, feedback and their latest prints.",
  },
  {
    title: "Free to Use",
    description:
      "Most models are free to download, remix and print at home or in a makerspace.",
  },
];

export default function About() {
  return (
    <main className="px-6 py-16 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-widest">
            About PrintForge
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Empowering makers worldwide
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            A place for 3D printing enthusiasts, makers and professional
            designers to share and discover amazing STL files.
          </p>
        </div>

        <section className="overflow-hidden bg-white border border-gray-200 rounded-2xl">
          <div className="flex flex-col items-center gap-8 p-8 md:flex-row md:p-10">
            <div className="w-full md:w-1/2">
              <Image
                src="/image.png"
                alt="3D printed models arranged on a desk"
                width={742}
                height={742}
                className="object-cover w-full rounded-xl h-80"
              />
            </div>

            <div className="w-full space-y-4 md:w-1/2">
              <h2 className="text-2xl font-bold">Our story</h2>

              <p className="text-gray-600">
                Founded in 2023, PrintForge has quickly become the go-to
                platform for 3D printing enthusiasts, makers, and professional
                designers to share and discover amazing STL files for 3D
                printing.
              </p>

              <p className="text-gray-600">
                Our mission is to foster a vibrant community where creativity
                meets technology, enabling anyone to bring their ideas to life
                through 3D printing.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/3d-models"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
                >
                  Browse models
                </Link>
                <Link
                  href="/about/mission"
                  className="px-5 py-2.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-full hover:border-black transition"
                >
                  Read our mission
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-8 border-t border-gray-200 md:grid-cols-3 md:p-10">
            {statistics.map((stat) => (
              <div key={stat.title}>
                <h3 className="mb-2 font-bold">{stat.title}</h3>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
