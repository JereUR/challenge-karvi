'use client'

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import ListCars from "@/components/ListCars"
import { useGridMode } from "@/hooks/useGridMode"
import { ITEMS_PER_PAGE } from "@/types/api"
import { useFavoritesCars } from "@/hooks/useFavoritesCars"
import { Button } from "@/components/ui/button"
import CarGridSkeleton from "@/components/skeletons/CarGridSkeleton"

export default function Favorites() {
  const [gridMode, setGridMode] = useGridMode()

  return (
    <main className="flex min-h-screen flex-col space-y-2 md:space-y-3">
      <FavoritesHeader />
      <div className="mx-auto flex flex-col gap-4">
        <Suspense fallback={<CarGridSkeleton />}>
          <FavoritesList gridMode={gridMode} setGridMode={setGridMode} />
        </Suspense>
      </div>
    </main>
  )
}

function FavoritesHeader() {
  return (
    <>
      <div className="sm:hidden">
        <Link href='/' className="block px-8 mt-2">
          <Button
            variant='outline'
            aria-label='Ir al inicio'
            className="w-full bg-primary text-white border-none transition-all duration-300 shadow-md hover:bg-primary/50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Button>
        </Link>
      </div>
      <div className="hidden sm:block max-w-[200px] mx-4">
        <Link href='/' className="block">
          <Button
            variant='outline'
            aria-label='Ir al inicio'
            className="w-full bg-white text-primary border-primary hover:bg-primary/30 transition-all duration-300 group overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center">
              <ChevronLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Volver al inicio
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Button>
        </Link>
      </div>
    </>
  )
}

interface FavoriteListProps {
  gridMode: boolean
  setGridMode: (gridMode: boolean) => void
}

function FavoritesList({ gridMode, setGridMode }: FavoriteListProps) {
  const searchParams = useSearchParams()
  const currentPage = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams])
  const { cars, loading, totalPages, totalResults, toggleFavorite, favorites } = useFavoritesCars(currentPage, ITEMS_PER_PAGE)

  return (
    <ListCars
      cars={cars}
      loading={loading}
      totalPages={totalPages}
      totalResults={totalResults}
      currentPage={currentPage}
      gridMode={gridMode}
      setGridMode={setGridMode}
      showSortOption={false}
      toggleFavorite={toggleFavorite}
      favorites={favorites}
    />
  )
}