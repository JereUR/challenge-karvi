import { Skeleton } from '@/components/ui/skeleton'

export function FilterSelectorSkeleton() {
  return (
    <div className="w-full max-w-sm" data-testid="filter-selector-skeleton">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex justify-between px-4 py-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
