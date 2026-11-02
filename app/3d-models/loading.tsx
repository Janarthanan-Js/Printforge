export default function Loading() {
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <div className="w-48 h-9 mb-3 bg-gray-200 rounded animate-pulse" />
      <div className="w-80 max-w-full h-4 mb-8 bg-gray-100 rounded animate-pulse" />
      <div className="w-full max-w-2xl h-12 mb-6 bg-gray-100 rounded-full animate-pulse" />

      <div className="flex flex-wrap gap-2 mb-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-24 h-9 bg-gray-100 rounded-full animate-pulse"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden border border-gray-200 rounded-lg"
          >
            <div className="aspect-square bg-gray-100 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
