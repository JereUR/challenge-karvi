'use client'

import { Suspense } from "react"

import ListCars from "@/components/ListCars"
import { useGridMode } from "@/hooks/useGridMode"
import { FilterSelector } from "@/components/FilterSelector"
import { ActiveFilters } from "@/components/ActiveFilters"
import Filtericon from "@/components/FilterIcon"
import SearchIcon from "@/components/SearchIcon"

export default function Home() {
  const [gridMode, setGridMode] = useGridMode()

  return (
    <main className="flex min-h-screen flex-col space-y-2 md:space-y-3">
      <div className="flex w-full justify-around py-1 sm:hidden z-50">
        <SearchIcon />
        <div className="h-6 my-auto w-px bg-border" aria-hidden="true" />
        <Suspense>
          <Filtericon />
        </Suspense>
      </div>
      <div className="flex w-full grow md:gap-5 p-2 md:p-5">
        <div className="sticky top-[8.25rem] flex flex-col gap-5">
          <div className="hidden h-fit flex-none space-y-3 px-3 py-5 sm:block lg:px-5 xl:w-80 z-50">
            <Suspense>
              <FilterSelector />
            </Suspense>
          </div>
        </div>
        <div className="mx-auto flex flex-col gap-4">
          <ActiveFilters />
          <Suspense>
            <ListCars gridMode={gridMode} setGridMode={setGridMode} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
