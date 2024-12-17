import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter, useSearchParams } from 'next/navigation'
import ListCars from '@/components/ListCars'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('ListCars Component', () => {
  const mockRouterPush = jest.fn()
  const mockSearchParams = new URLSearchParams()

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
  })

  it('should render loading skeleton when loading is true', () => {
    render(
      <ListCars
        cars={[]}
        loading={true}
        totalPages={1}
        totalResults={0}
        currentPage={1}
        gridMode={true}
        setGridMode={jest.fn()}
        showSortOption={true}
        toggleFavorite={jest.fn()}
        favorites={[]}
      />
    )
    expect(screen.getByTestId('car-grid-skeleton')).toBeInTheDocument()
  })

  it('should display no cars message when no cars are available', () => {
    render(
      <ListCars
        cars={[]}
        loading={false}
        totalPages={1}
        totalResults={0}
        currentPage={1}
        gridMode={true}
        setGridMode={jest.fn()}
        showSortOption={true}
        toggleFavorite={jest.fn()}
        favorites={[]}
      />
    )
    expect(screen.getByText(/No hay carros para mostrar/i)).toBeInTheDocument()
  })

  it('should render cars and handle pagination', () => {
    const mockCars = [
      {
        "id": 1,
        "city": "São Paulo",
        "year": 2024,
        "brand": "CHEVROLET",
        "model": "ONIX",
        "version": "1.0 LT MANUAL",
        "price": 85000,
        "mileage": 5000
      }
    ]

    render(
      <ListCars
        cars={mockCars}
        loading={false}
        totalPages={5}
        totalResults={100}
        currentPage={1}
        gridMode={true}
        setGridMode={jest.fn()}
        showSortOption={true}
        toggleFavorite={jest.fn()}
        favorites={[]}
      />
    )

    expect(screen.getByText('100 carros encontrados')).toBeInTheDocument()
    expect(screen.getByText('CHEVROLET ONIX')).toBeInTheDocument()

    fireEvent.click(screen.getByText('2'))

    expect(mockRouterPush).toHaveBeenCalledWith('?page=2')
  })
})

