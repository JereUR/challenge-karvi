export interface CarData {
  id: string
  city: string
  year: number
  brand: string
  model: string
  version: string
  price: number
  mileage: number
}

export interface FilterBrandYearVersion {
  id: string
  name: string
}

export interface FilterCity {
  id: string
  name: string
  slug: string
}

export interface FilterModel {
  id: string
  name: string
  brand: string
}

export interface AllFilters {
  brands: FilterBrandYearVersion[]
  cities: FilterCity[]
  models: FilterModel[]
  years: FilterBrandYearVersion[]
  versions: FilterBrandYearVersion[]
}
