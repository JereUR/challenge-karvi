import { ArrowLeft, ArrowRight, LayoutGrid, List } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { CarGridItem } from './CarGridItem'
import { CarListItem } from './CarListItem'
import { CarData } from '@/types/api'
import { useState } from 'react'
import { SortDropdown } from './SortDropdown'
import CarGridSkeleton from './skeletons/CarGridSkeleton'

interface ListCarsProps {
  cars: CarData[],
  loading: boolean,
  totalPages: number,
  totalResults: number,
  currentPage: number,
  gridMode: boolean
  setGridMode: (value: boolean) => void
  showSortOption: boolean
  toggleFavorite: (carId: number) => void
  favorites: number[]
}

export default function ListCars({ cars, loading, totalPages, totalResults, currentPage, gridMode, setGridMode, showSortOption, toggleFavorite, favorites }: ListCarsProps) {
  const [currentSort, setCurrentSort] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', newPage.toString())
      router.push(`?${params.toString()}`)
    }
  }

  const handleSortChange = (newSort: string) => {
    setCurrentSort(newSort)
    const params = new URLSearchParams(searchParams.toString())
    if (newSort) {
      params.set('sortedBy', newSort)
    } else {
      params.delete('sortedBy')
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 8

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const left = Math.max(1, currentPage - 3)
      const right = Math.min(totalPages, currentPage + 3)

      if (left > 1) {
        pages.push(1)
        if (left > 2) pages.push('...')
      }

      for (let i = left; i <= right; i++) {
        pages.push(i)
      }

      if (right < totalPages) {
        if (right < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (loading) return <CarGridSkeleton />

  if (cars.length === 0) return (
    <div className="flex justify-center h-screen">
      <p className="mt-4 italic">No hay carros para mostrar.</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#1B2141]">{totalResults.toLocaleString("de-DE")} carros encontrados</p>
        <div className="flex items-center space-x-2">
          {showSortOption && <SortDropdown currentSort={currentSort} onSortChange={handleSortChange} />}
          <div
            className="md:hidden cursor-pointer text-[#87899C]"
            onClick={() => setGridMode(!gridMode)}
            aria-label="Alternar modo de grilla/lista"
            data-testid="toggle-button"
          >
            {gridMode ? <List className="h-6 w-6" /> : <LayoutGrid className="h-6 w-6" />}
          </div>
        </div>
      </div>
      <div className={gridMode ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center" : "flex flex-col space-y-4"}>
        {cars.map((car) =>
          gridMode ? (
            <CarGridItem key={car.id} car={car} toggleFavorite={toggleFavorite} favorites={favorites} />
          ) : (
            <CarListItem key={car.id} car={car} toggleFavorite={toggleFavorite} favorites={favorites} />
          )
        )}
      </div>
      <div className="flex justify-between items-center gap-2 leading-6 border-t mt-1">
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 text-gray-400 rounded-full font-medium"
          aria-label='Página anterior'
          disabled={currentPage === 1}
        >
          <ArrowLeft /> <span className='hidden md:block'>Anterior</span>
        </Button>
        <div className="flex gap-2">
          {generatePageNumbers().map((page, index) => (
            <Button
              variant="ghost"
              key={index}
              onClick={() => handlePageChange(Number(page))}
              aria-label={`Página ${page}`}
              className={`text-base text-gray-400 font-bold rounded-none border-t-2 border-transparent px-3 py-6 hover:bg-background hover:text-gray-500 ${page === currentPage ? "text-primary border-t-2 border-primary" : ""}`}
              disabled={page === "..." || page === currentPage}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 text-gray-400 rounded-full font-medium"
          aria-label='Página siguiente'
          disabled={currentPage === totalPages}
        >
          <span className='hidden md:block'>Próximo</span> <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

