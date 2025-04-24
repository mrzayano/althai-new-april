export default function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-gray-900 rounded-2xl overflow-hidden">
          <div className="h-64 bg-gray-800 animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2" />
            <div className="flex justify-between">
              <div className="h-6 bg-gray-800 rounded animate-pulse w-1/4" />
              <div className="h-6 bg-gray-800 rounded animate-pulse w-1/4" />
            </div>
            <div className="h-10 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
