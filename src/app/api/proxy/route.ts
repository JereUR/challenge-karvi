import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '12', 10)

  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string)
    const data = response.data.items

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const paginatedData = data.slice(startIndex, endIndex)

    return NextResponse.json({
      page,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / itemsPerPage),
      items: paginatedData
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 })
  }
}
