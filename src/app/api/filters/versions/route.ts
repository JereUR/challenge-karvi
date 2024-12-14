import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string)
    const data = response.data.availableFilters.version

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error al obtener los filtros de versiones:', error)
    return NextResponse.json(
      { error: 'Error al obtener los filtros de versiones' },
      { status: 500 }
    )
  }
}
