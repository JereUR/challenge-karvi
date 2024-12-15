import { useState, useEffect } from 'react'

import { getFavorites, setFavorite } from '@/utils/favorites'

const useFavorite = (carId: number) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    const favorites = getFavorites()
    setIsFavorite(favorites.includes(carId))
  }, [carId])

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite
    setIsFavorite(newFavoriteStatus)
    setFavorite(carId, newFavoriteStatus)
  }

  return {
    isFavorite,
    toggleFavorite
  }
}

export default useFavorite
