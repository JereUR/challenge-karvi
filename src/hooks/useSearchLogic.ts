import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useDebounce } from '@/hooks/useDebounce'

export function useSearchLogic(initialSearchTerm: string) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearchTerm) {
      params.set('q', debouncedSearchTerm)
    } else {
      params.delete('q')
    }
    router.push(`?${params.toString()}`)
  }, [debouncedSearchTerm, router, searchParams])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsExpanded(false)
      inputRef.current?.blur()
    }
  }

  return {
    isExpanded,
    searchTerm,
    inputRef,
    setSearchTerm,
    setIsExpanded,
    handleToggle,
    handleKeyDown
  }
}
