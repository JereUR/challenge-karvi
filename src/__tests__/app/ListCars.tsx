import ListCars from '@/components/ListCars'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

describe('ListCars Component', () => {
  const mockRouterReplacePush = jest.fn()

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockRouterReplacePush,
      push: mockRouterReplacePush,
    })
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
      />
    )

    expect(screen.getByText('100 carros encontrados')).toBeInTheDocument()
    expect(screen.getByText('CHEVROLET ONIX')).toBeInTheDocument()

    fireEvent.click(screen.getByText('2'))

    expect(mockRouterReplacePush).toHaveBeenCalledWith('?page=2')
  })
})
