import axios from 'axios'
import { CarData } from '@/types/api'

interface Filters {
  modelo?: string[]
  marca?: string[]
  ano?: string[]
  version?: string[]
  ciudad?: string[]
}

interface ResultsResponse {
  page: number
  totalItems: number
  totalPages: number
  items: CarData[]
}

export const getResults = async (
  currentPage: number,
  ITEMS_PER_PAGE: number,
  filters: Filters,
  sortedBy: string,
  q: string
): Promise<ResultsResponse> => {
  const params = {
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    ...filters,
    sortedBy,
    q
  }

  try {
    const response = await axios.get<ResultsResponse>('/api/cars', { params })
    return response.data
  } catch (err) {
    console.error('Error fetching results:', err)
    throw err
  }
}
