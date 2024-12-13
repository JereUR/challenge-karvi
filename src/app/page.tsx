"use client"

import ListCars from "@/components/ListCars"
import { Suspense, useState } from "react"

export default function Home() {
  const [gridMode, setGridMode] = useState<boolean>(true)

  return (
    <div className="mx-auto flex gap-4">
      <Suspense>
        <ListCars gridMode={gridMode} />
      </Suspense>
    </div>
  )
}
