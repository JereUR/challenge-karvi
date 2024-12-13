"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CarData } from "@/types/api"
import carImage from "@/assets/car-image.png"
import { CalculatorPrice } from "@/utils/icons"

interface CardGridItemProps {
  car: CarData
}

export function CarGridItem({ car }: CardGridItemProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const images = Array(5).fill(carImage)

  return (
    <Card className="overflow-hidden shadow-md w-[300px] mx-auto">
      <CardContent className="p-3 pb-1">
        <div className="relative">
          <div className="relative w-[280px] h-[200px]">
            {images.map((image, index) => (
              <div
                key={index}>
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${car.brand} ${car.model} - View ${index + 1}`}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div
                  className={`md:hidden absolute inset-0 transition-opacity duration-300 ${currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${car.brand} ${car.model} - View ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-400 bg-white rounded-full hover:text-gray-500 z-10"
          >
            <Heart className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full transition-all ${currentImage === index
                  ? "w-4 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="px-1 py-3 space-y-2 leading-6">
          <div className="flex gap-3 text-sm text-muted-foreground">
            <span className="py-0.5 px-2 rounded-full bg-gray-100 font-medium">{car.year}</span>
            <span className="py-0.5 px-2 rounded-full bg-gray-100 font-medium">{car.mileage.toLocaleString('de-DE')} km</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
            <p className="text-muted-foreground font-medium">{car.version}</p>
          </div>
          <div>
            <p className="font-medium text-2xl text-orange-400">
              R${car.price.toLocaleString('de-DE')}
            </p>
            <p className="font-medium text-sm text-[#b7bcc5]">{car.city}</p>
          </div>
          <Button className="w-full font-bold text-sm rounded-full bg-[#566DED] hover:bg-[#495EC8]">
            <CalculatorPrice />Simular parcelas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

