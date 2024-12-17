export const getFavorites = (): number[] => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('favoritos') || '[]')
}

export const setFavorite = (id: number, isFavorite: boolean): void => {
  const favorites = getFavorites()
  const index = favorites.indexOf(id)

  if (isFavorite && index === -1) {
    favorites.push(id)
  } else if (!isFavorite && index !== -1) {
    favorites.splice(index, 1)
  }

  localStorage.setItem('favoritos', JSON.stringify(favorites))
}
