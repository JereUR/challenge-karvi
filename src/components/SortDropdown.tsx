import { ArrowDownUp, } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface SortDropdownProps {
  currentSort: string
  onSortChange: (sort: string) => void
}

export const SortDropdown = ({ currentSort, onSortChange }: SortDropdownProps) => {
  const sortOptions = [
    { label: 'Más relevantes', value: '' },
    { label: 'Precio: Más bajo primero', value: 'price-asc' },
    { label: 'Precio: Más alto primero', value: 'price-desc' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 border-none shadow-none text-primary hover:text-primary">
          <ArrowDownUp />
          <span>
            {sortOptions.find((option) => option.value === currentSort)?.label || 'Ordenar por'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='text-primary space-y-1'>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-100 hover:text-primary ${currentSort === option.value ? 'font-bold bg-blue-200' : ''}`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
