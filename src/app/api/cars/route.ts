import { NextResponse } from 'next/server'
import axios from 'axios'

import { CarData, FilterValues } from '@/types/api'

const urlApi = process.env.NEXT_PUBLIC_API_URL as string

const filterData = (
  data: CarData[],
  filters: FilterValues,
  query: string
): CarData[] => {
  return data.filter((item) => {
    const matchesQuery =
      !query ||
      Object.entries(item)
        .filter(([key]) => key !== 'id')
        .some(([_, value]) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )

    return (
      matchesQuery &&
      (!filters.brands?.length || filters.brands.includes(item.brand)) &&
      (!filters.models?.length || filters.models.includes(item.model)) &&
      (!filters.years?.length ||
        filters.years.includes(item.year.toString())) &&
      (!filters.versions?.length || filters.versions.includes(item.version)) &&
      (!filters.cities?.length || filters.cities.includes(item.city))
    )
  })
}

const sortData = (data: CarData[], sortedBy: string): CarData[] => {
  if (sortedBy === 'price-asc') {
    return [...data].sort((a, b) => a.price - b.price)
  }
  if (sortedBy === 'price-desc') {
    return [...data].sort((a, b) => b.price - a.price)
  }
  return data
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '12', 10)
    const sortedBy = searchParams.get('sortedBy') || ''
    const query = searchParams.get('q') || ''

    const filters: FilterValues = {
      brands: searchParams.getAll('marca[]'),
      models: searchParams.getAll('modelo[]'),
      years: searchParams.getAll('ano[]'),
      versions: searchParams.getAll('version[]'),
      cities: searchParams.getAll('ciudad[]')
    }

    const apiResponse = await axios.get(urlApi)
    const data: CarData[] = apiResponse.data.items

    const filteredData = filterData(data, filters, query)
    const sortedData = sortData(filteredData, sortedBy)

    const startIndex = (page - 1) * itemsPerPage
    const paginatedData = sortedData.slice(
      startIndex,
      startIndex + itemsPerPage
    )

    return NextResponse.json({
      page,
      totalItems: sortedData.length,
      totalPages: Math.ceil(sortedData.length / itemsPerPage),
      items: paginatedData
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: 'Error fetching data. Please try again.' },
      { status: 500 }
    )
  }
}
