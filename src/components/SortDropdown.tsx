'use client'

import React, { useMemo } from 'react'
import { ArrowDownUp } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface SortDropdownProps {
  currentSort: string
  onSortChange: (sort: string) => void
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
  const sortOptions = useMemo(() => [
    { label: 'Más relevantes', value: '' },
    { label: 'Precio: Más bajo primero', value: 'price-asc' },
    { label: 'Precio: Más alto primero', value: 'price-desc' },
  ], [])

  const currentSortLabel = useMemo(() => {
    if (!currentSort) return 'Ordenar por'
    return sortOptions.find((option) => option.value === currentSort)?.label || 'Ordenar por'
  }, [currentSort, sortOptions])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center md:space-x-2 border-none outline-none shadow-none text-primary text-xs md:text-sm hover:text-primary hover:outline-none focus:outline-none"
          data-testid='sortedBy'
          aria-label='Ordenar por'
        >
          <ArrowDownUp />
          <span className='hidden md:inline'>
            {currentSortLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='text-primary text-xs md:sm space-y-1'>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            data-testid={option.label}
            role="menuitem"
            className={`cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-100 hover:text-primary ${currentSort === option.value ? 'font-bold bg-blue-200' : ''}`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

