import { useState, useEffect } from 'react'

import { useToast } from '@/hooks/use-toast'
import { getAllFilters } from '@/utils/getFilters'
import { AllFilters } from '@/types/api'

export const useFilters = () => {
  const [filters, setFilters] = useState<AllFilters>({
    brands: [],
    cities: [],
    models: [],
    years: [],
    versions: []
  })
  const [loading, setLoading] = useState(true)

  const { toast } = useToast()

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true)
      try {
        const allFilters = await getAllFilters()
        setFilters(allFilters)
      } catch (error) {
        console.error('Error al obtener los filtros:', error)
        toast({
          variant: 'destructive',
          title: 'Error al cargar los filtros',
          description:
            'Ocurrió un problema al obtener los filtros. Por favor, intenta de nuevo más tarde.'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFilters()
  }, [toast])

  return { ...filters, loading }
}
