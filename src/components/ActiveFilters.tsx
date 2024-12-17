'use client'

import React, { useCallback, useMemo } from 'react'
import { useSearchParams, useRouter } from "next/navigation"
import { Trash2, X } from 'lucide-react'

import { Button } from "./ui/button"

const FILTER_KEYS = ['modelo', 'marca', 'ano', 'version', 'ciudad'] as const
type FilterKey = typeof FILTER_KEYS[number]

export function ActiveFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const removeFilter = useCallback((key: FilterKey, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const currentValues = current.getAll(key)

    const newValues = currentValues.filter((v) => v !== value)
    current.delete(key)
    newValues.forEach((v) => current.append(key, v))

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${window.location.pathname}${query}`, { scroll: false })
  }, [searchParams, router])

  const clearAllFilters = useCallback(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    FILTER_KEYS.forEach((key) => {
      current.delete(key)
    })

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${window.location.pathname}${query}`, { scroll: false })
  }, [searchParams, router])

  const activeFilters = useMemo(() => {
    const params = Array.from(searchParams.entries())
    return params.filter(([key]) => FILTER_KEYS.includes(key as FilterKey))
      .map(([key, value]) => ({ key: key as FilterKey, value }))
  }, [searchParams])

  const hasFilters = activeFilters.length > 0

  if (!hasFilters) return null

  return (
    <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
      <div>
        {activeFilters.map(({ key, value }) => (
          <span
            key={`${key}-${value}`}
            className="inline-flex items-center px-3 py-1 text-primary font-medium border border-primary bg-background rounded-full text-xs md:text-sm mr-2 mb-2"
          >
            {value}
            <button
              onClick={() => removeFilter(key, value)}
              aria-label='Eliminar filtro'
              data-testid={`delete ${value}`}
              className="ml-2"
            >
              <X className="h-4 w-4 transition-transform cursor-pointer duration-100 ease-in-out hover:scale-110" />
            </button>
          </span>
        ))}
      </div>
      <Button
        variant='ghost'
        aria-label='Limpiar filtros'
        onClick={clearAllFilters}
        className="text-primary hover:text-destructive hover:bg-red-100"
      >
        <Trash2 /> Limpiar Filtros
      </Button>
    </div>
  )
}

