'use client'

import { Suspense } from "react"

import ListCars from "@/components/ListCars"
import { useGridMode } from "@/hooks/useGridMode"
import { FilterSelector } from "@/components/FilterSelector"

export default function Home() {
  const [gridMode, setGridMode] = useGridMode()

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex w-full justify-around border-t bg-card py-3 sm:hidden z-50">
        Icon filter bar
      </div>
      <div className="flex w-full grow md:gap-5 p-2 md:p-5">
        <div className="sticky top-[8.25rem] flex flex-col gap-5">
          <div className="hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80 z-50">
            <Suspense>
              <FilterSelector />
            </Suspense>
          </div>
        </div>
        <div className="mx-auto flex flex-col gap-4">
          <Suspense>
            <ListCars gridMode={gridMode} setGridMode={setGridMode} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
