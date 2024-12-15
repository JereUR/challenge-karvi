'use client'

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

import ListCars from "@/components/ListCars"
import { useGridMode } from "@/hooks/useGridMode"
import { ITEMS_PER_PAGE } from "@/types/api"
import { useFavoritesCars } from "@/hooks/useFavoritesCars"
import { Button } from "@/components/ui/button"

export default function Favorites() {
  const [gridMode, setGridMode] = useGridMode()

  const searchParams = useSearchParams()
  const currentPage = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams])

  const { cars, loading, totalPages, totalResults } = useFavoritesCars(currentPage, ITEMS_PER_PAGE)

  return (
    <main className="flex min-h-screen flex-col space-y-2 md:space-y-3">
      <Link href='/'><Button variant='ghost'>Volver al inicio</Button></Link>
      <div className="mx-auto flex flex-col gap-4">
        <Suspense>
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
    </main>
  )
}

