'use client'

import { Suspense, useState } from "react"
import { SlidersVertical } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { FilterSelector } from "@/components/FilterSelector"

export default function Filtericon() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDialog = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <Button variant='ghost' onClick={toggleDialog} className="flex items-center gap-2 text-primary font-bold">
        <SlidersVertical />Filtrar
      </Button>
      <Dialog open={isOpen} onOpenChange={toggleDialog}>
        <DialogContent className="max-w-lg p-6 overflow-auto max-h-[80vh]">
          <DialogHeader className="flex justify-between">
            <DialogTitle className="text-xl font-semibold">Selecciona Filtros</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh]">
            <Suspense>
              <FilterSelector />
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
