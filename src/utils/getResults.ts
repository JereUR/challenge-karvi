import axios from 'axios'

export const getResults = async (
  currentPage: number,
  ITEMS_PER_PAGE: number,
  filters: {
    modelo?: string[]
    marca?: string[]
    ano?: string[]
    version?: string[]
    ciudad?: string[]
  },
  sortedBy: string
) => {
  const params = {
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    ...filters,
    sortedBy
  }

  try {
    const response = await axios.get('/api/cars', { params })
    return response.data
  } catch (err) {
    throw err
  }
}
