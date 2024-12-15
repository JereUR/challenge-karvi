'use client'

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

import ListCars from "@/components/ListCars"
import { useGridMode } from "@/hooks/useGridMode"
import { FilterSelector } from "@/components/FilterSelector"
import { ActiveFilters } from "@/components/ActiveFilters"
import FilterIcon from "@/components/FilterIcon"
import SearchIcon from "@/components/SearchIcon"
import { ITEMS_PER_PAGE } from "@/types/api"
import { useCars } from "@/hooks/useCars"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [gridMode, setGridMode] = useGridMode()

  const searchParams = useSearchParams()
  const currentPage = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams])

  const { cars, loading, totalPages, totalResults } = useCars(currentPage, ITEMS_PER_PAGE)

  return (
    <main className="flex min-h-screen flex-col space-y-2 md:space-y-3">
      <Suspense>
        <div className="flex w-full py-1 sm:hidden z-50">
          <div className="flex-1">
            <SearchIcon />
          </div>
          <div className="h-6 my-auto w-px bg-border" aria-hidden="true" />
          <div className="flex-1 ">
            <FilterIcon />
          </div>
        </div>
      </Suspense>
      <div className="flex w-full grow md:gap-5 p-2 md:p-5">
        <div className="sticky top-[8.25rem] flex flex-col gap-5">
          <div className="hidden h-fit flex-none space-y-3 px-3 py-5 sm:block lg:px-5 xl:w-80 z-50">
            <Suspense>
              <div className="flex flex-col gap-4">
                <FilterSelector />
                <SearchIcon />
              </div>
            </Suspense>
            <Link href='/favoritos'><Button variant='ghost'>Ir a favoritos</Button></Link>
          </div>
        </div>
        <div className="mx-auto flex flex-col gap-4">
          <Suspense>
            <ActiveFilters />
            <ListCars
              cars={cars}
              loading={loading}
              totalPages={totalPages}
              totalResults={totalResults}
              currentPage={currentPage}
              gridMode={gridMode}
              setGridMode={setGridMode}
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

