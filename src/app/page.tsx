'use client'

import { Suspense } from "react"

import ListCars from "@/components/ListCars"
import { useGridMode } from "@/hooks/useGridMode"

export default function Home() {
  const [gridMode, setGridMode] = useGridMode()

  return (
    <div className="mx-auto flex flex-col gap-4">
      <Suspense>
        <ListCars gridMode={gridMode} setGridMode={setGridMode} />
      </Suspense>
    </div>
  )
}
