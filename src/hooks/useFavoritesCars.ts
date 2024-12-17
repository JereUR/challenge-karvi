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
  const [favorites, setFavorites] = useState<number[]>([])
  const [toastMessage, setToastMessage] = useState<{
    title: string
    description: string
  } | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    if (toastMessage) {
      toast({
        variant: 'default',
        title: toastMessage.title,
        description: toastMessage.description
      })
    }
  }, [toastMessage, toast])

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('favoritos') || '[]'
    )
    setFavorites(storedFavorites)
  }, [])

  useEffect(() => {
    if (favorites.length > 0) {
      fetchCars()
    }
  }, [favorites, currentPage, ITEMS_PER_PAGE])

  const fetchCars = useCallback(async () => {
    setLoading(true)
    try {
      const ids = favorites
      const data = await getFavorites(currentPage, ITEMS_PER_PAGE, ids)

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
  }, [currentPage, ITEMS_PER_PAGE, favorites, toast])

  const toggleFavorite = useCallback(
    (carId: number) => {
      setFavorites((prevFavorites) => {
        const isFavorite = prevFavorites.includes(carId)
        const updatedFavorites = isFavorite
          ? prevFavorites.filter((id) => id !== carId)
          : [...prevFavorites, carId]

        localStorage.setItem('favoritos', JSON.stringify(updatedFavorites))

        setToastMessage({
          title: isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
          description: isFavorite
            ? `El coche ha sido eliminado de tus favoritos.`
            : `El coche ha sido agregado a tus favoritos.`
        })

        return updatedFavorites
      })
    },
    [toast]
  )

  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  return { cars, loading, totalPages, totalResults, favorites, toggleFavorite }
}
