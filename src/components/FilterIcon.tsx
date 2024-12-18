'use client'

import React, { useState, useCallback } from "react"
import { SlidersVertical, X } from 'lucide-react'

import { Button } from "./ui/button"
import { FilterSelector } from "@/components/FilterSelector"
import { cn } from "@/lib/utils"

export default function FilterIcon() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDialog = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div className="flex justify-center h-10">
      <Button
        variant='ghost'
        onClick={toggleDialog}
        className="flex items-center gap-2 text-primary font-bold"
        aria-label="Filtrar"
      >
        <SlidersVertical />Filtrar
      </Button>
      <div
        data-testid={isOpen ? "filter-panel" : "filter-selector"}
        className={cn(
          "fixed inset-y-0 h-screen left-0 w-full sm:w-80 bg-background shadow-lg z-[201] overflow-y-auto transition-transform duration-300 ease-in-out transform",
          isOpen ? 'translate-x-0' : '-translate-x-full',
          "md:hidden"
        )}
      >
        <div className="p-4 relative">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cerrar filtros"
            className="absolute top-2 right-2"
            onClick={toggleDialog}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="mt-5">
            <h1 className="text-lg font-bold mb-5">Selecciona Filtros</h1>
            <FilterSelector />
          </div>
        </div>
      </div>
    </div>
  )
}

