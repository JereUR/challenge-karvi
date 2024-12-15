import { NextResponse } from 'next/server'
import axios from 'axios'

import { CarData } from '@/types/api'

const filterData = (
  data: CarData[],
  filters: {
    marca?: string[]
    modelo?: string[]
    ano?: string[]
    version?: string[]
    ciudad?: string[]
  }
) => {
  return data.filter((item) => {
    return (
      (!filters.marca?.length || filters.marca.includes(item.brand)) &&
      (!filters.modelo?.length || filters.modelo.includes(item.model)) &&
      (!filters.ano?.length || filters.ano.includes(item.year.toString())) &&
      (!filters.version?.length || filters.version.includes(item.version)) &&
      (!filters.ciudad?.length || filters.ciudad.includes(item.city))
    )
  })
}

const sortData = (data: CarData[], sortedBy: string) => {
  if (sortedBy === 'price-asc') {
    return data.sort((a, b) => a.price - b.price)
  }
  if (sortedBy === 'price-desc') {
    return data.sort((a, b) => b.price - a.price)
  }
  return data
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '12', 10)
    const sortedBy = searchParams.get('sortedBy') || ''

    console.log({ sortedBy })

    const filters = {
      marca: searchParams.getAll('marca[]'),
      modelo: searchParams.getAll('modelo[]'),
      ano: searchParams.getAll('ano[]'),
      version: searchParams.getAll('version[]'),
      ciudad: searchParams.getAll('ciudad[]')
    }

    const apiResponse = await axios.get(
      process.env.NEXT_PUBLIC_API_URL as string
    )
    const data: CarData[] = apiResponse.data.items

    const filteredData = filterData(data, filters)
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
    console.error('Error al obtener los datos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los datos. Por favor intente nuevamente.' },
      { status: 500 }
    )
  }
}
