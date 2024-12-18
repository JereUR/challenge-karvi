'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

import { useToast } from '@/hooks/use-toast'
import { CarData } from '@/types/api'
import { getResults } from '@/utils/getResults'

export const useCars = (currentPage: number, ITEMS_PER_PAGE: number) => {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  const { toast } = useToast()
  const searchParams = useSearchParams()

  const filters = useMemo(
    () => ({
      modelo: searchParams.getAll('modelo'),
      marca: searchParams.getAll('marca'),
      ano: searchParams.getAll('ano'),
      version: searchParams.getAll('version'),
      ciudad: searchParams.getAll('ciudad')
    }),
    [searchParams]
  )

  const sortedBy = useMemo(
    () => searchParams.get('sortedBy') || '',
    [searchParams]
  )

  const q = useMemo(() => searchParams.get('q') || '', [searchParams])

  const fetchCars = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getResults(
        currentPage,
        ITEMS_PER_PAGE,
        filters,
        sortedBy,
        q
      )

      setCars(data.items)
      setTotalPages(data.totalPages)
      setTotalResults(data.totalItems)
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data || err.message || 'Ocurrió un problema inesperado'
        : 'Ocurrió un error desconocido'

      toast({
        variant: 'destructive',
        title: 'Error al cargar los datos',
        description: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, ITEMS_PER_PAGE, filters, sortedBy, q, toast])

  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  return { cars, loading, totalPages, totalResults }
}
