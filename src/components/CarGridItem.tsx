import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CarData } from '@/types/api'
import { CalculatorPrice } from '@/utils/icons'
import { cn } from '@/lib/utils'
import carImage from '@/assets/car-image.png'
import carImage2 from '@/assets/car-image-2.jpg'
import useFavorite from '@/hooks/useFavorite'

interface CardGridItemProps {
  car: CarData
}

export function CarGridItem({ car }: CardGridItemProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const images = Array.from({ length: 5 }, (_, index) => (index % 2 === 0 ? carImage : carImage2))

  const { isFavorite, toggleFavorite } = useFavorite(car.id)

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <Card className="overflow-hidden shadow-md w-[90vw] md:w-[300px] mx-auto">
      <CardContent className="p-3 pb-1">
        <div className="flex justify-center">
          <div className="relative overflow-hidden rounded-md w-[320px] h-[220px] md:w-[280px] md:h-[200px] group">
            {images.map((image, index) => (
              <div key={index} className={`absolute inset-0 transition-transform duration-500 ease-in-out ${currentImage === index ? "translate-x-0" : "translate-x-full hidden"}`}>
                <Image
                  src={image}
                  alt={`${car.brand} ${car.model} - View ${index + 1}`}
                  fill
                  className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  priority
                />
              </div>
            ))}
            <Button
              onClick={handlePrevious}
              variant='ghost'
              size='icon'
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={handleNext}
              variant='ghost'
              size='icon'
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight />
            </Button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 rounded-full transition-all ${currentImage === index ? "w-4 bg-white" : "w-2 bg-white/50 hover:bg-white/70"}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-gray-400 bg-white rounded-full hover:text-gray-500 z-10"
              onClick={toggleFavorite}
            >
              <Heart className={cn(
                "h-4 w-4",
                isFavorite && "fill-red-600 text-red-600",
              )} />
            </Button>
          </div>
        </div>
        <div className="px-1 py-3 space-y-2 leading-6 text-[#1B2141]">
          <div className="flex gap-3 text-sm text-muted-foreground">
            <span className="py-0.5 px-2 rounded-full bg-[#EBECF5] font-medium">{car.year}</span>
            <span className="py-0.5 px-2 rounded-full bg-[#EBECF5] font-medium">{car.mileage.toLocaleString("de-DE")} km</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
            <p className="font-medium">{car.version}</p>
          </div>
          <div>
            <p className="font-medium text-2xl text-[#FF7042]">R${car.price.toLocaleString("de-DE")}</p>
            <p className="font-medium text-sm text-[#87899C]">{car.city}</p>
          </div>
          <Button className="w-full font-bold text-sm rounded-full text-white bg-primary hover:bg-primary/70">
            <CalculatorPrice />Simular parcelas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
