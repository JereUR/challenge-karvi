import { Skeleton } from '@/components/ui/skeleton'

export default function CarGridSkeleton() {
  return (
    <div className="flex flex-col gap-2 m-2" data-testid='car-grid-skeleton'>
      <div className="flex justify-between">
        <Skeleton className="h-5 w-32 md:w-60" />
        <div className='flex gap-2'>
          <Skeleton className="h-5 w-8 md:hidden" />
          <Skeleton className="h-5 w-8 md:w-36" />
        </div>

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
            <Skeleton className="w-80 md:w-72 h-48 rounded-md" />
            <Skeleton className="absolute top-2 right-2 h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="px-1 py-3 space-y-2">
          <div className="flex gap-3">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-32 mt-1" />
          </div>
          <div>
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-4 w-40 mt-1" />
          </div>
          <Skeleton className="h-8 w-64 rounded-full" />
        </div>
      </div>
    </div>
  )
}

