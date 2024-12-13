"use client"

import axios from "axios"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"
import { CarData } from "@/types/api"
import { getResults } from "@/utils/getResults"
import { CarGridItem } from "./CarGridItem"
import CarListItem from "./CarListItem"
import { Button } from "@/components/ui/button"

interface ListCarsProps {
  gridMode: boolean
}

const ITEMS_PER_PAGE = 12

export default function ListCars({ gridMode }: ListCarsProps) {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const { toast } = useToast()

  useEffect(() => {
    async function getCars() {
      try {
        const data = await getResults()
        setCars(data)
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE))
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data || err.message || "Ocurrió un problema inesperado"
          toast({
            variant: "destructive",
            title: "Error al cargar los datos",
            description: errorMessage,
          })
        } else {
          toast({
            variant: "destructive",
            title: "Error al cargar los datos",
            description: "Ocurrió un error desconocido",
          })
        }
      } finally {
        setLoading(false)
      }
    }

    getCars()
  }, [])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentCars = cars.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 8

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const left = Math.max(1, currentPage - 3)
      const right = Math.min(totalPages, currentPage + 3)

      if (left > 1) {
        pages.push(1)
        if (left > 2) pages.push("...")
      }

      for (let i = left; i <= right; i++) {
        pages.push(i)
      }

      if (right < totalPages) {
        if (right < totalPages - 1) pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (loading) return <Loader2 className="mx-auto animate-spin text-primary" />

  return (
    <div className="flex flex-col gap-4">
      <p>{cars.length.toLocaleString("de-DE")} carros encontrados</p>
      <div className={gridMode ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center" : "flex flex-col space-y-4"}>

        {currentCars.map((car) =>
          gridMode ? (
            <CarGridItem key={car.id} car={car} />
          ) : (
            <CarListItem key={car.id} car={car} />
          )
        )}
      </div>
      <div className="flex justify-between items-center gap-2 leading-6 border-t mt-1">
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 text-gray-400 rounded-full font-medium"
          disabled={currentPage === 1}
        >
          <ArrowLeft /> Anterior
        </Button>
        <div className="flex gap-2">
          {generatePageNumbers().map((page, index) => (
            <Button
              variant="ghost"
              key={index}
              onClick={() => handlePageChange(Number(page))}
              className={`text-base text-gray-400 font-bold rounded-none border-t-2 border-transparent px-3 py-6 hover:bg-background hover:text-gray-500 ${page === currentPage ? "text-[#566DED] border-t-2 border-[#566DED]" : ""}`}
              disabled={page === "..." || page === currentPage}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 text-gray-400 rounded-full font-medium"
          disabled={currentPage === totalPages}
        >
          Próximo <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
