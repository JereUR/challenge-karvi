'use client'

import React from 'react'
import { Search, X } from 'lucide-react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { useSearchLogic } from '@/hooks/useSearchLogic'

export default function SearchIcon() {
  const {
    isExpanded,
    searchTerm,
    inputRef,
    setSearchTerm,
    exitButtonRef,
    handleToggle,
    handleKeyDown,
    handleExit
  } = useSearchLogic('')

  return (
    <div className="relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[300px] h-10 md:mt-2">
      <Button
        variant="ghost"
        className={cn(
          "flex justify-start items-center gap-4 text-primary md:border-b md:border-primary rounded-none cursor-text text-sm md:text-lg font-bold w-full hover:md:text-primary",
          isExpanded && "hidden"
        )}
        aria-label='Buscar'
        onClick={handleToggle}
      >
        <Search className="h-5 w-5" />
        <span className="truncate max-w-[140px] md:max-w-[250px]">
          {searchTerm || 'Buscar'}
        </span>
      </Button>
      <div
        className={cn(
          "absolute top-0 left-0 w-full border-none",
          isExpanded ? "block" : "hidden"
        )}
      >
        <div className="flex justify-center items-center relative h-10 text-primary">
          <Input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-10 w-full ml-2 pl-9 md:pl-0 max-w-[180px] text-sm md:text-lg border-none outline-none border-b border-primary rounded-none shadow-none focus:border-blue-500 focus:ring-0 focus:outline-none active:outline-none focus:border-none active:border-none active:ring-0"
          />
          <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" />
          <Button
            ref={exitButtonRef}
            variant="ghost"
            size="icon"
            aria-label='Cerrar buscador'
            className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 border-none focus:ring-0 focus:outline-none focus:border-none"
            onClick={handleExit}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

