import { NextResponse } from 'next/server'
import axios from 'axios'

import {
  AllFilters,
  AvailableFilter,
  CarData,
  FilterWithMatch
} from '@/types/api'

function calculateMatches(
  items: CarData[],
  filters: AvailableFilter[],
  key: keyof CarData
): FilterWithMatch[] {
  const counts = items.reduce<Record<string | number, number>>((acc, item) => {
    const value = item[key]
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {})

  return filters.map((filter) => ({
    ...filter,
    match: counts[filter.id] || 0
  }))
}

export async function GET() {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string)
    const data = response.data

    const items: CarData[] = data.items
    const availableFilters = data.availableFilters

    const result: AllFilters = {
      brands: calculateMatches(items, availableFilters.brand, 'brand'),
      cities: calculateMatches(items, availableFilters.city, 'city'),
      models: calculateMatches(items, availableFilters.model, 'model'),
      versions: calculateMatches(items, availableFilters.version, 'version'),
      years: calculateMatches(items, availableFilters.year, 'year')
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error al obtener los filtros:', error)
    return NextResponse.json(
      { error: 'Error al obtener los filtros' },
      { status: 500 }
    )
  }
}
