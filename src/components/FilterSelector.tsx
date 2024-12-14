'use client'

import { useFilters } from '@/hooks/useFilters'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FilterSelector() {
  const { brands, cities, models, years, versions, loading } = useFilters()
  const searchParams = useSearchParams()
  const router = useRouter()

  const updateFilter = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const currentValues = current.getAll(key)

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter(v => v !== value)
      current.delete(key)
      newValues.forEach(v => current.append(key, v))
    } else {
      current.append(key, value)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${window.location.pathname}${query}`, { scroll: false })
  }

  const getSelectedCount = (key: string) => {
    return searchParams.getAll(key).length
  }

  if (loading) {
    return <div className="text-center p-4">Cargando filtros...</div>
  }

  const renderFilterOptions = (
    options: { id: string; name: string; count?: number }[],
    filterKey: string
  ) => {
    const selectedValues = searchParams.getAll(filterKey)
    return (
      <div className="space-y-2 py-2">
        {options.map((option) => (
          <button
            key={option.id}
            className={`w-full text-left py-1 text-sm hover:text-primary ${selectedValues.includes(option.id) || selectedValues.includes(option.name) ? 'text-primary font-semibold' : ''
              }`}
            onClick={() => updateFilter(filterKey, option.id)}
          >
            {option.name}
            {option.count !== undefined && <span className="text-muted-foreground"> ({option.count})</span>}
          </button>
        ))}
      </div>
    )
  }

  const renderAccordionItem = (
    value: string,
    label: string,
    options: { id: string; name: string; count?: number }[],
    filterKey: string
  ) => {
    const selectedCount = getSelectedCount(filterKey)
    return (
      <AccordionItem value={value} className="border-b">
        <AccordionTrigger className="px-4 py-3 text-base font-normal hover:no-underline">
          <span>{label}</span>
          {selectedCount > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              ({selectedCount})
            </span>
          )}
        </AccordionTrigger>
        <AccordionContent className="px-4">
          {renderFilterOptions(options, filterKey)}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <div className="w-full max-w-sm border rounded-lg">
      <Accordion type="multiple" className="w-full">
        {renderAccordionItem("marca", "Marca", brands, "marca")}
        {renderAccordionItem("modelo", "Modelo", models, "modelo")}
        {renderAccordionItem("ano", "Año", years, "ano")}
        {renderAccordionItem("version", "Version", versions, "version")}
        {renderAccordionItem("cidade", "Cidade", cities, "cidade")}
      </Accordion>
    </div>
  )
}

