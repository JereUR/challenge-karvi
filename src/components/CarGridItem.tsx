import Image from "next/image"
import { Calculator, Heart } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CarData } from "@/types/api"
import carImage from "@/assets/car-image.png"

interface CardGridItemProps {
  car: CarData
}

export function CarGridItem({ car }: CardGridItemProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={carImage}
            alt={`${car.brand} ${car.model}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:text-primary"
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{car.year}</span>
            <span>{car.mileage} km</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
            <p className="text-sm text-muted-foreground">{car.version}</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-primary">
              R${car.price}
            </p>
            <p className="text-sm text-muted-foreground">{car.city}</p>
          </div>
          <Button className="w-full rounded-full bg-blue-700 hover:bg-blue-800" size='icon'>
            <Calculator />Simular parcelas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

