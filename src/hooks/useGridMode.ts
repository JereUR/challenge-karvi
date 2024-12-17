'use client'

import { useEffect, useState, useCallback } from 'react'

export function useGridMode() {
  const [gridMode, setGridMode] = useState<boolean>(true)

  const handleResize = useCallback(() => {
    if (window.innerWidth > 768) {
      setGridMode(true)
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return [gridMode, setGridMode] as const
}
