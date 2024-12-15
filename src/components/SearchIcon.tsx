'use client'

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
    setIsExpanded,
    handleToggle,
    handleKeyDown,
  } = useSearchLogic('')

  return (
    <div className="relative w-full max-w-[30vw] sm:max-w-[200px] md:max-w-[300px]">
      <Button
        variant="ghost"
        className={cn(
          "flex items-center gap-2 text-primary md:text-black text-sm md:text-lg font-bold w-full justify-start px-3 hover:md:text-primary",
          isExpanded && "hidden"
        )}
        onClick={handleToggle}
      >
        <Search className="h-5 w-5" />
        {searchTerm === '' ? <span>Buscar</span> : <span>{searchTerm}</span>}
      </Button>
      <div
        className={cn(
          "absolute top-0 left-0 w-full border-none",
          isExpanded ? "block" : "hidden"
        )}
      >
        <div className="relative text-primary">
          <Input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 pr-9 h-10 w-full text-sm md:text-lg border-none focus:ring-0 focus:outline-none focus:border-none"
          />
          <Search className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 border-none focus:ring-0 focus:outline-none focus:border-none"
            onClick={() => {
              setSearchTerm('')
              setIsExpanded(false)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
