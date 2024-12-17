'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

export function useSearchLogic(initialSearchTerm: string) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState<string>(
    initialQuery || initialSearchTerm
  )

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
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

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev)
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isExpanded])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
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
    },
    [router, searchParams, searchTerm]
  )

  const handleExit = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.delete('q')
    router.replace(`?${params.toString()}`)
    setSearchTerm('')
    setIsExpanded(false)
  }, [router, searchParams])

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
