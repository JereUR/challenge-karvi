"use client"

import { Suspense, useEffect, useState } from "react"

import ListCars from "@/components/ListCars"

export default function Home() {
  const [gridMode, setGridMode] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setGridMode(true)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="mx-auto flex gap-4">
      <Suspense>
        <ListCars gridMode={gridMode} />
      </Suspense>
    </div>
  )
}
