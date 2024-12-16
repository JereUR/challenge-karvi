import { Skeleton } from '@/components/ui/skeleton'

export default function CarGridSkeleton() {
  return (
    <div className="flex flex-col gap-2 m-2">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-5 w-36" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
        {Array.from({ length: 8 }, (_, index) => (
          <CarGridItemSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

function CarGridItemSkeleton() {
  return (
    <div className="shadow-md w-[90vw] md:w-[300px] mx-auto border rounded-2xl">
      <div className="p-3 pb-1">
        <div className="flex justify-center">
          <div className="relative overflow-hidden rounded-md w-[320px] h-[220px] md:w-[280px] md:h-[200px]">
            <Skeleton className="h-full w-full" />
            <Skeleton className="absolute top-2 right-2 h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="px-1 py-3 space-y-2">
          <div className="flex gap-3">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </div>
          <div>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/3 mt-1" />
          </div>
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </div>
  )
}

