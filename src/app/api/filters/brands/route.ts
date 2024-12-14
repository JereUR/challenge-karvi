import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string)
    const data = response.data.availableFilters.brand

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error al obtener los filtros de marcas:', error)
    return NextResponse.json(
      { error: 'Error al obtener los filtros de marcas' },
      { status: 500 }
    )
  }
}
