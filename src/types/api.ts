export interface CarData {
  id: number
  city: string
  year: number
  brand: string
  model: string
  version: string
  price: number
  mileage: number
}

export interface AvailableFilter {
  id: string
  name: string
  slug?: string
  brand?: string
}

export interface FilterWithMatch extends AvailableFilter {
  match: number
}

export interface AllFilters {
  brands: FilterWithMatch[]
  cities: FilterWithMatch[]
  models: FilterWithMatch[]
  versions: FilterWithMatch[]
  years: FilterWithMatch[]
}

export interface FilterValues {
  brands: string[]
  cities: string[]
  models: string[]
  versions: string[]
  years: string[]
}

export const ITEMS_PER_PAGE = 12
