import { useState, useEffect } from 'react'
import axios from 'axios'

import { useToast } from '@/hooks/use-toast'
import { CarData } from '@/types/api'
import { getResults } from '@/utils/getResults'

export const useCars = (currentPage: number, ITEMS_PER_PAGE: number) => {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  const { toast } = useToast()

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      try {
        const data = await getResults(currentPage, ITEMS_PER_PAGE)
        setCars(data.items)
        setTotalPages(data.totalPages)
        setTotalResults(data.totalItems)
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const errorMessage =
            err.response?.data ||
            err.message ||
            'Ocurrió un problema inesperado'
          toast({
            variant: 'destructive',
            title: 'Error al cargar los datos',
            description: errorMessage
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Error al cargar los datos',
            description: 'Ocurrió un error desconocido'
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [currentPage, ITEMS_PER_PAGE, toast])

  return { cars, loading, totalPages, totalResults }
}
