'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { useToast } from '@/hooks/use-toast'
import { CarData } from '@/types/api'
import { getFavorites } from '@/utils/getFavorites'

export const useFavoritesCars = (
  currentPage: number,
  ITEMS_PER_PAGE: number
) => {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  const { toast } = useToast()

  const getFavoriteIds = useCallback(() => {
    return JSON.parse(localStorage.getItem('favoritos') || '[]')
  }, [])

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      try {
        const ids = getFavoriteIds()
        const data = await getFavorites(currentPage, ITEMS_PER_PAGE, ids)

        setCars(data.items)
        setTotalPages(data.totalPages)
        setTotalResults(data.totalItems)
      } catch (err: unknown) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data ||
            err.message ||
            'Ocurrió un problema inesperado'
          : 'Ocurrió un error desconocido'

        toast({
          variant: 'destructive',
          title: 'Error al cargar los datos',
          description: errorMessage
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [currentPage, ITEMS_PER_PAGE, getFavoriteIds, toast])

  return { cars, loading, totalPages, totalResults }
}
