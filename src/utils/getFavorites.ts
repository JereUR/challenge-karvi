import axios from 'axios'

export const getFavorites = async (
  currentPage: number,
  ITEMS_PER_PAGE: number,
  ids: number[]
) => {
  const params = {
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    ids
  }

  try {
    const response = await axios.get('/api/favorites-cars', { params })
    return response.data
  } catch (err) {
    throw err
  }
}
