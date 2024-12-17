import { render, screen, fireEvent } from "@testing-library/react"
import { CarData } from "@/types/api"
import { CarGridItem } from "@/components/CarGridItem"

const car: CarData = {
  "id": 1,
  "city": "São Paulo",
  "year": 2024,
  "brand": "CHEVROLET",
  "model": "ONIX",
  "version": "1.0 LT MANUAL",
  "price": 85000,
  "mileage": 5000
}

describe("CarGridItem", () => {
  const mockToggleFavorite = jest.fn()
  const favorites: number[] = []

  it("should render the car details correctly", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    expect(screen.getByText("CHEVROLET ONIX")).toBeInTheDocument()
    expect(screen.getByText("1.0 LT MANUAL")).toBeInTheDocument()
    expect(screen.getByText("R$85.000")).toBeInTheDocument()
    expect(screen.getByText("São Paulo")).toBeInTheDocument()
    expect(screen.getByText("5.000 km")).toBeInTheDocument()
    expect(screen.getByText("2024")).toBeInTheDocument()
  })

  it("should changes images when navigation buttons are clicked", async () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    const nextButton = await screen.findByTestId('next-button')
    const prevButton = await screen.findByTestId('prev-button')

    const images = screen.getAllByAltText(/CHEVROLET ONIX/i)
    expect(images[0]).toBeVisible()

    fireEvent.click(nextButton)
    expect(images[1]).toBeVisible()

    fireEvent.click(prevButton)
    expect(images[0]).toBeVisible()
  })

  it("should updates the current image when a dot indicator is clicked", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    const dotButtons = screen.getAllByRole("button", { name: /Ver imagen/i })

    fireEvent.click(dotButtons[1])

    const images = screen.getAllByAltText(/CHEVROLET ONIX/i)
    expect(images[1]).toBeVisible()
  })

  it("should display the first image as default", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    const images = screen.getAllByAltText(/CHEVROLET ONIX/i)

    expect(images[0]).toBeVisible()

    for (let i = 1; i < images.length; i++) {
      expect(images[i]).toHaveClass('hidden')
    }
  })

  it("should navigate cyclically through the images", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    const nextButton = screen.getByTestId('next-button')
    const prevButton = screen.getByTestId('prev-button')

    const images = screen.getAllByAltText(/CHEVROLET ONIX/i)

    for (let i = 0; i < images.length; i++) {
      fireEvent.click(nextButton)
    }
    expect(images[0]).toBeVisible()

    for (let i = 0; i < images.length; i++) {
      fireEvent.click(prevButton)
    }
    expect(images[images.length - 1]).toBeVisible()
  })

  it("should have accessible navigation buttons", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    const prevButton = screen.getByLabelText('Foto anterior')
    const nextButton = screen.getByLabelText('Foto siguiente')

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it("should update aria-label of heart button based on favorite state", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    const favoriteButton = screen.getByLabelText('Agregar a favoritos')
    expect(favoriteButton).toBeInTheDocument()

    fireEvent.click(favoriteButton)

    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={[car.id]} />)
    expect(screen.getByLabelText('Eliminar de favoritos')).toBeInTheDocument()
  })

  it("should toggle the favorite state when the heart button is clicked", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    const favoriteButton = screen.getByLabelText('Agregar a favoritos')

    fireEvent.click(favoriteButton)
    expect(mockToggleFavorite).toHaveBeenCalledWith(car.id)
  })

  it("should show the heart icon filled when the car is a favorite", () => {
    const favoriteCar = { ...car, id: 2 }
    render(<CarGridItem car={favoriteCar} toggleFavorite={mockToggleFavorite} favorites={[2]} />)

    const favoriteIcon = screen.getByTestId("heart-button")

    expect(favoriteIcon).toHaveClass("fill-red-600")
  })


  it("should renders the simulate installment button", () => {
    render(<CarGridItem car={car} toggleFavorite={mockToggleFavorite} favorites={favorites} />)

    expect(screen.getByText('Simular parcelas')).toBeInTheDocument()
  })
})
