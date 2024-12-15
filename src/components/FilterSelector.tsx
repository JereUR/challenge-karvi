'use client'

import { useSearchParams, useRouter } from 'next/navigation'

import { useFilters } from '@/hooks/useFilters'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FilterWithMatch } from '@/types/api'

export function FilterSelector() {
  const { brands, cities, models, years, versions, loading } = useFilters()
  const searchParams = useSearchParams()
  const router = useRouter()

  const updateFilter = (key: string, value: string) => {
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
  }

  const getSelectedmatch = (key: string) => {
    return searchParams.getAll(key).length
  }

  if (loading) {
    return <div className="text-center p-4">Cargando filtros...</div>
  }

  const renderFilterOptions = (
    options: FilterWithMatch[],
    filterKey: string
  ) => {
    const selectedValues = searchParams.getAll(filterKey)
    return (
      <div className="space-y-2 py-2">
        {options.map((option) => (
          <button
            key={option.id}
            className={`w-full text-left py-1 hover:text-primary ${selectedValues.includes(option.id) || selectedValues.includes(option.name.toString()) ? 'text-primary font-semibold' : ''
              }`}
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
  }

  const renderAccordionItem = (
    value: string,
    label: string,
    options: FilterWithMatch[],
    filterKey: string
  ) => {
    const selectedmatch = getSelectedmatch(filterKey)
    return (
      <AccordionItem value={value} className="border-b">
        <AccordionTrigger className="flex justify-between px-4 py-3 text-lg text-[#1B2141] hover:no-underline">
          <span className=' font-bold'>{label}</span>
          {selectedmatch > 0 && (
            <span className="font-medium text-sm text-primary">
              ({selectedmatch})
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
    <div className="w-full max-w-sm ">
      <Accordion type="multiple" className="w-full">
        {renderAccordionItem("marca", "Marca", brands.map((brand) => ({
          id: brand.id,
          name: brand.name,
          match: brand.match
        })), "marca")}

        {renderAccordionItem("modelo", "Modelo", models.map((model) => ({
          id: model.id,
          name: model.name,
          match: model.match
        })), "modelo")}

        {renderAccordionItem("ano", "Año", years.map((year) => ({
          id: year.id.toString(),
          name: year.name.toString(),
          match: year.match
        })), "ano")}

        {renderAccordionItem("version", "Version", versions.map((version) => ({
          id: version.id,
          name: version.name,
          match: version.match
        })), "version")}

        {renderAccordionItem("ciudad", "Ciudad", cities.map((city) => ({
          id: city.id,
          name: city.name,
          match: city.match
        })), "ciudad")}
      </Accordion>
    </div>
  )
}
