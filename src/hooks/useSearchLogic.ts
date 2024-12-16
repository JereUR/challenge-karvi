'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

export function useSearchLogic(initialSearchTerm: string) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const exitButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() || '')
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
        !inputRef.current.contains(event.target as Node) &&
        exitButtonRef.current &&
        !exitButtonRef.current.contains(event.target as Node)
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
      const params = new URLSearchParams(searchParams)
      if (searchTerm) {
        params.set('q', searchTerm)
      } else {
        params.delete('q')
      }
      router.push(`?${params.toString()}`)
      setIsExpanded(false)
      inputRef.current?.blur()
    }
  }

  const handleExit = () => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.delete('q')
    router.replace(`?${params.toString()}`)
    setSearchTerm('')
    setIsExpanded(false)
  }

  return {
    isExpanded,
    searchTerm,
    inputRef,
    exitButtonRef,
    setSearchTerm,
    handleToggle,
    handleKeyDown,
    handleExit
  }
}
