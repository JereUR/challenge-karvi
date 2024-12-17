import { NextResponse } from 'next/server'
import axios from 'axios'

import { CarData } from '@/types/api'

const urlApi = process.env.NEXT_PUBLIC_API_URL as string

const getFavoritesById = (data: CarData[], ids: string[]) => {
  return data.filter((item) => {
    return ids.includes(item.id.toString())
  })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '12', 10)
    const ids = searchParams.getAll('ids[]')

    const apiResponse = await axios.get(urlApi)

    const data: CarData[] = apiResponse.data.items

    const favorites = getFavoritesById(data, ids)

    const startIndex = (page - 1) * itemsPerPage
    const paginatedData = favorites.slice(startIndex, startIndex + itemsPerPage)

    return NextResponse.json({
      page,
      totalItems: favorites.length,
      totalPages: Math.ceil(favorites.length / itemsPerPage),
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
