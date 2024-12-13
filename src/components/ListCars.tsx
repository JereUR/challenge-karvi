"use client"

import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"
import { CarData } from "@/types/api"
import { getResults } from "@/utils/getResults"
import { CarGridItem } from "./CarGridItem"
import CarListItem from "./CarListItem"

interface ListCarsProps {
  gridMode: boolean
}

export default function ListCars({ gridMode }: ListCarsProps) {
  const [cars, setCars] = useState<CarData[]>([])
  const [loading, setLoading] = useState(true)

  const { toast } = useToast()

  useEffect(() => {
    async function getCars() {
      try {
        const data = await getResults()
        setCars(data)
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

  if (loading) return <Loader2 className="mx-auto animate-spin text-primary" />

  return (
    <div className={gridMode ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col space-y-4"}>
      {cars.map((car) => (
        gridMode ? (
          <CarGridItem key={car.id} car={car} />
        ) : (
          <CarListItem key={car.id} car={car} />
        )
      ))}
    </div>
  )
}
