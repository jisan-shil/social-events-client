export default function EventSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card bg-base-200 shadow-md overflow-hidden">
          <div className="skeleton h-48 w-full rounded-none"></div>
          <div className="card-body gap-3">
            <div className="skeleton h-5 w-24"></div>
            <div className="skeleton h-6 w-full"></div>
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-1/2"></div>
            <div className="skeleton h-12 w-full mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}