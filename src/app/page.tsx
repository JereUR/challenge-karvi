'use client'

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Heart } from 'lucide-react'

import ListCars from "@/components/ListCars"
import { useGridMode } from "@/hooks/useGridMode"
import { FilterSelector } from "@/components/FilterSelector"
import { ActiveFilters } from "@/components/ActiveFilters"
import FilterIcon from "@/components/FilterIcon"
import SearchIcon from "@/components/SearchIcon"
import { ITEMS_PER_PAGE } from "@/types/api"
import { useCars } from "@/hooks/useCars"
import { Button } from "@/components/ui/button"
import CarGridSkeleton from "@/components/skeletons/CarGridSkeleton"
import { FilterSelectorSkeleton } from "@/components/skeletons/FilterSelectorSkeleton"

export default function Home() {
  const [gridMode, setGridMode] = useGridMode()

  const searchParams = useSearchParams()
  const currentPage = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams])

  const { cars, loading, totalPages, totalResults } = useCars(currentPage, ITEMS_PER_PAGE)

  return (
    <main className="flex min-h-screen flex-col space-y-2 md:space-y-3">
      <div className="mt-2 sm:hidden">
        <Suspense>
          <div className="flex w-full py-1 z-50">
            <div className="flex-1">
              <SearchIcon />
            </div>
            <div className="h-6 my-auto w-px bg-border" aria-hidden="true" />
            <div className="flex-1 ">
              <FilterIcon />
            </div>
          </div>
        </Suspense>
        <Link href='/favoritos' className="block px-8 mt-2">
          <Button
            variant='outline'
            aria-label='Ir a Favoritos'
            className="w-full bg-primary text-white border-none transition-all duration-300 shadow-md hover:bg-primary/50"
          >
            <Heart className="w-5 h-5 mr-2" />
            Ir a Favoritos
          </Button>
        </Link>
      </div>
      <div className="flex w-full grow md:gap-5 p-2 md:p-5">
        <div className="sticky top-[8.25rem] flex flex-col gap-5">
          <div className="hidden h-fit flex-none space-y-3 px-3 py-5 sm:block lg:px-5 xl:w-80 z-50">
            <Link href='/favoritos' className="block">
              <Button
                variant='outline'
                aria-label='Ir a Favoritos'
                className="w-full bg-white text-primary border-primary hover:bg-primary/30 transition-all duration-300 group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center">
                  <Heart className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Ir a Favoritos
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button>
            </Link>
            <Suspense fallback={<FilterSelectorSkeleton />}>
              <div className="flex flex-col gap-4">
                <FilterSelector />
                <SearchIcon />
              </div>
            </Suspense>
          </div>
        </div>
        <div className="mx-auto flex flex-col gap-4">
          <Suspense fallback={<CarGridSkeleton />}>
            <ActiveFilters />
            <ListCars
              cars={cars}
              loading={loading}
              totalPages={totalPages}
              totalResults={totalResults}
              currentPage={currentPage}
              gridMode={gridMode}
              setGridMode={setGridMode}
              showSortOption={true}
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

