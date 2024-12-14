import axios from 'axios'

import { CarData } from '@/types/api'

interface PaginatedResponse {
  page: number
  totalItems: number
  totalPages: number
  items: CarData[]
}

export async function getResults(
  page: number,
  itemsPerPage: number
): Promise<PaginatedResponse> {
  try {
    const response = await axios.get<PaginatedResponse>(`/api/cars`, {
      params: { page, itemsPerPage }
    })
    return response.data
  } catch (error) {
    console.error('Error al obtener los datos:', error)
    throw error
  }
}
