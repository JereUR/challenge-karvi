import axios from 'axios'
import { CarData } from '@/types/api'

export async function getResults(): Promise<CarData[]> {
  try {
    const response = await axios.get<CarData[]>('/api/proxy')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
