import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Skeleton className="aspect-square rounded-xl" />

        <div>
          <Skeleton className="h-10 w-3/4 mb-4" />

          <div className="flex items-center mb-6">
            <Skeleton className="h-8 w-24 mr-4" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="space-y-3 mb-8">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>

          <div className="mb-8">
            <Skeleton className="h-7 w-40 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
