import axios from 'axios'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Loader2, LayoutGrid, List } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { CarData } from '@/types/api'
import { getResults } from '@/utils/getResults'
import { CarGridItem } from './CarGridItem'
import CarListItem from './CarListItem'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

interface ListCarsProps {
  gridMode: boolean
  setGridMode: (value: boolean) => void
}

const ITEMS_PER_PAGE = 12

export default function ListCars({ gridMode, setGridMode }: ListCarsProps) {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = parseInt(searchParams.get("page") || "1", 10)

  useEffect(() => {
    async function fetchCars() {
      setLoading(true)
      try {
        const data = await getResults(currentPage, ITEMS_PER_PAGE)
        setCars(data.items)
        setTotalPages(data.totalPages)
        setTotalResults(data.totalItems)
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data || err.message || 'Ocurrió un problema inesperado'
          toast({
            variant: 'destructive',
            title: 'Error al cargar los datos',
            description: errorMessage,
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Error al cargar los datos',
            description: 'Ocurrió un error desconocido',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`?page=${newPage}`)
    }
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

  if (loading) return <Loader2 className="mx-auto animate-spin text-primary" />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-sm text-[#1B2141]">{totalResults.toLocaleString("de-DE")} carros encontrados</p>
        <div className="md:hidden cursor-pointer text-[#87899C]" onClick={() => setGridMode(!gridMode)}>{gridMode ? <List className="h-6 w-6" /> : <LayoutGrid className="h-6 w-6" />}</div>
      </div>
      <div className={gridMode ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center" : "flex flex-col space-y-4"}>

        {cars.map((car) =>
          gridMode ? (
            <CarGridItem key={car.id} car={car} />
          ) : (
            <CarListItem key={car.id} car={car} />
          )
        )}
      </div>
      <div className="flex justify-between items-center gap-2 leading-6 border-t mt-1">
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 text-gray-400 rounded-full font-medium"
          disabled={currentPage === 1}
        >
          <ArrowLeft /> Anterior
        </Button>
        <div className="flex gap-2">
          {generatePageNumbers().map((page, index) => (
            <Button
              variant="ghost"
              key={index}
              onClick={() => handlePageChange(Number(page))}
              className={`text-base text-gray-400 font-bold rounded-none border-t-2 border-transparent px-3 py-6 hover:bg-background hover:text-gray-500 ${page === currentPage ? "text-[#566DED] border-t-2 border-[#566DED]" : ""}`}
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
          disabled={currentPage === totalPages}
        >
          Próximo <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
