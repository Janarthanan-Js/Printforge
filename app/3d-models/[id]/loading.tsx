export default function Loading() {
  return (
    <div className="px-4 py-8 mx-auto max-w-6xl">
      <div className="w-64 h-4 mb-6 bg-gray-100 rounded animate-pulse" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="aspect-square bg-gray-100 rounded-xl animate-pulse" />

        <div className="space-y-4">
          <div className="w-28 h-7 bg-gray-100 rounded-full animate-pulse" />
          <div className="w-3/4 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
          <div className="w-5/6 h-4 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-20 bg-gray-100 rounded animate-pulse" />
          <div className="flex gap-3">
            <div className="w-36 h-11 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-28 h-11 bg-gray-100 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
