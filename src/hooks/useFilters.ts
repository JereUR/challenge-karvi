'use client'

import { useState, useEffect, useCallback } from 'react'

import { useToast } from '@/hooks/use-toast'
import { getAllFilters } from '@/utils/getAllFilters'
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

  const fetchFilters = useCallback(async () => {
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
  }, [toast])

  useEffect(() => {
    fetchFilters()
  }, [fetchFilters])

  return { ...filters, loading }
}
