'use client'

import * as React from 'react'
import { useCallback, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import { useFilters } from '@/hooks/useFilters'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FilterWithMatch } from '@/types/api'
import { FilterSelectorSkeleton } from './skeletons/FilterSelectorSkeleton'

export function FilterSelector() {
  const { brands, cities, models, years, versions, loading } = useFilters()
  const searchParams = useSearchParams()
  const router = useRouter()

  const updateFilter = useCallback((key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const currentValues = current.getAll(key)

    if (currentValues.includes(value.toString())) {
      const newValues = currentValues.filter((v) => v !== value.toString())
      current.delete(key)
      newValues.forEach((v) => current.append(key, v))
    } else {
      current.append(key, value.toString())
    }

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${window.location.pathname}${query}`, { scroll: false })
  }, [searchParams, router])

  const getSelectedMatch = useCallback((key: string) => {
    return searchParams.getAll(key).length
  }, [searchParams])

  const renderFilterOptions = useCallback((
    options: FilterWithMatch[],
    filterKey: string
  ) => {
    const selectedValues = searchParams.getAll(filterKey)
    return (
      <div className="space-y-2 py-2">
        {options.map((option) => (
          <button
            key={option.id}
            className={`w-full text-left py-1 hover:text-primary ${selectedValues.includes(option.id) || selectedValues.includes(option.name.toString())
                ? 'text-primary font-semibold'
                : ''
              }`}
            aria-label={`${option.name}`}
            onClick={() => updateFilter(filterKey, option.id)}
          >
            {option.name}
            {option.match !== undefined && (
              <span className="text-[#87899C] ml-1"> ({option.match})</span>
            )}
          </button>
        ))}
      </div>
    )
  }, [searchParams, updateFilter])

  const renderAccordionItem = useCallback((
    value: string,
    label: string,
    options: FilterWithMatch[],
    filterKey: string
  ) => {
    const selectedMatch = getSelectedMatch(filterKey)
    return (
      <AccordionItem value={value} className="border-b">
        <AccordionTrigger className="flex justify-between px-4 py-3 text-lg text-[#1B2141] hover:no-underline">
          <span className='font-bold'>{label}</span>
          {selectedMatch > 0 && (
            <span className="font-medium text-sm text-primary">
              ({selectedMatch})
            </span>
          )}
        </AccordionTrigger>
        <AccordionContent className="px-4">
          {renderFilterOptions(options, filterKey)}
        </AccordionContent>
      </AccordionItem>
    )
  }, [getSelectedMatch, renderFilterOptions])

  const accordionItems = useMemo(() => [
    { value: "marca", label: "Marca", options: brands, filterKey: "marca" },
    { value: "modelo", label: "Modelo", options: models, filterKey: "modelo" },
    { value: "ano", label: "Año", options: years.map(year => ({ ...year, id: year.id.toString(), name: year.name.toString() })), filterKey: "ano" },
    { value: "version", label: "Version", options: versions, filterKey: "version" },
    { value: "ciudad", label: "Ciudad", options: cities, filterKey: "ciudad" },
  ], [brands, cities, models, years, versions])

  if (loading) {
    return <FilterSelectorSkeleton />
  }

  return (
    <div className="w-full max-w-sm">
      <Accordion type="multiple" className="w-full">
        {accordionItems.map(item => (
          <React.Fragment key={item.value}>
            {renderAccordionItem(item.value, item.label, item.options, item.filterKey)}
          </React.Fragment>
        ))}
      </Accordion>
    </div>
  )
}

