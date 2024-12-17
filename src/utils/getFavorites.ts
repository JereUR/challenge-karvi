import axios from 'axios'
import { CarData } from '@/types/api'

interface FavoritesResponse {
  page: number
  totalItems: number
  totalPages: number
  items: CarData[]
}

export const getFavorites = async (
  currentPage: number,
  ITEMS_PER_PAGE: number,
  ids: number[]
): Promise<FavoritesResponse> => {
  const params = {
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    ids
  }

  try {
    const response = await axios.get<FavoritesResponse>('/api/favorites-cars', {
      params
    })
    return response.data
  } catch (err) {
    console.error('Error fetching favorites:', err)
    throw err
  }
}
