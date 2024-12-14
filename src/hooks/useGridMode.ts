import { useEffect, useState } from 'react'

export function useGridMode() {
  const [gridMode, setGridMode] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setGridMode(true)
      } else {
        setGridMode(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return [gridMode, setGridMode] as const
}
