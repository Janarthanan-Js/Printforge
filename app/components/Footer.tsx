import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-950 text-gray-400">
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-white">PrintForge</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              A community-driven library of 3D printing models. Discover,
              collect and share designs made by makers around the world.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/3d-models" className="hover:text-white">
                  All Models
                </Link>
              </li>
              <li>
                <Link
                  href="/3d-models?sort=popular"
                  className="hover:text-white"
                >
                  Most Popular
                </Link>
              </li>
              <li>
                <Link href="/3d-models?sort=newest" className="hover:text-white">
                  Newest
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about/mission" className="hover:text-white">
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-10 text-xs border-t border-gray-800">
          &copy; {new Date().getFullYear()} PrintForge. Built with Next.js.
        </div>
      </div>
    </footer>
  );
}
