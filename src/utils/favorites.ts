export const getFavorites = (): number[] => {
  return JSON.parse(localStorage.getItem('favoritos') || '[]')
}

export const setFavorite = (id: number, isFavorite: boolean): void => {
  const favorites = getFavorites()
  if (isFavorite) {
    if (!favorites.includes(id)) {
      favorites.push(id)
    }
  } else {
    const index = favorites.indexOf(id)
    if (index !== -1) {
      favorites.splice(index, 1)
    }
  }
  localStorage.setItem('favoritos', JSON.stringify(favorites))
}
