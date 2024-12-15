'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { Trash2, X } from "lucide-react"

import { Button } from "./ui/button"

export function ActiveFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const removeFilter = (key: string, value: string) => {
    if (key === 'page' || key === 'q') return

    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const currentValues = current.getAll(key)

    const newValues = currentValues.filter((v) => v !== value)
    current.delete(key)
    newValues.forEach((v) => current.append(key, v))

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${window.location.pathname}${query}`, { scroll: false })
  }

  const clearAllFilters = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    Array.from(current.keys()).forEach((key) => {
      if (key !== 'page' && key !== 'q') {
        current.delete(key)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${window.location.pathname}${query}`, { scroll: false })
  }

  const renderActiveFilters = () => {
    const params = Array.from(searchParams.entries())
    const filters: { key: string, value: string }[] = []

    params.forEach(([key, value]) => {
      if (key !== 'page' && key !== 'q') {
        filters.push({ key, value })
      }
    })

    return filters.map(({ key, value }) => (
      <span
        key={`${key}-${value}`}
        className="inline-flex items-center px-3 py-1 text-primary font-medium border border-primary bg-background rounded-full text-xs md:text-sm mr-2 mb-2"
      >
        {value}
        <button
          onClick={() => removeFilter(key, value)}
          className="ml-2"
        >
          <X className="h-4 w-4 transition-transform cursor-pointer duration-100 ease-in-out hover:scale-110" />
        </button>
      </span>
    ))
  }

  const hasFilters = Array.from(searchParams.entries()).some(([key]) => key !== 'page' && key !== 'q')

  return (
    <>
      {hasFilters && (
        <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
          <div>{renderActiveFilters()}</div>
          <Button
            variant='ghost'
            onClick={clearAllFilters}
            className="text-primary hover:text-destructive hover:bg-red-100"
          >
            <Trash2 /> Limpiar Filtros
          </Button>
        </div>
      )}
    </>
  )
}
