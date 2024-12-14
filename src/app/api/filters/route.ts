import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string)
    const data = response.data.availableFilters

    return NextResponse.json({
      brands: data.brand,
      cities: data.city,
      models: data.model,
      versions: data.version,
      years: data.year
    })
  } catch (error) {
    console.error('Error al obtener los filtros:', error)
    return NextResponse.json(
      { error: 'Error al obtener los filtros' },
      { status: 500 }
    )
  }
}
