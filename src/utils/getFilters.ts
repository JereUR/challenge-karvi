import axios from 'axios'

import { AllFilters } from '@/types/api'

export async function getAllFilters(): Promise<AllFilters> {
  try {
    const response = await axios.get<AllFilters>('/api/filters')
    return response.data
  } catch (error) {
    console.error('Error al obtener los filtros:', error)
    throw error
  }
}
