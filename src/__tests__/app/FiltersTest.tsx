import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { useFilters } from '@/hooks/useFilters'
import { FilterSelector } from '@/components/FilterSelector'

jest.mock('./../../hooks/useFilters', () => ({
  useFilters: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

describe('FilterSelector Component', () => {
  const mockRouterReplace = jest.fn()

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockRouterReplace,
    });

    (useFilters as jest.Mock).mockReturnValue({
      brands: [{ id: 'CHEVROLET', name: 'CHEVROLET', match: 6 }],
      models: [{ id: 'ONIX', name: 'ONIX', match: 3 }],
      versions: [],
      years: [],
      cities: [],
      loading: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render all filter categories', () => {
    render(<FilterSelector />)

    expect(screen.getByText('Marca')).toBeInTheDocument()
    expect(screen.getByText('Modelo')).toBeInTheDocument()
    expect(screen.getByText('Version')).toBeInTheDocument()
    expect(screen.getByText('Año')).toBeInTheDocument()
    expect(screen.getByText('Ciudad')).toBeInTheDocument()
  })

  it('should display options for a filter category', () => {
    render(<FilterSelector />)

    fireEvent.click(screen.getByText('Marca'))
    expect(screen.getByText('CHEVROLET')).toBeInTheDocument()
    expect(screen.getByText('(6)')).toBeInTheDocument()
  })

  it('should update search params when a filter is selected', async () => {
    render(<FilterSelector />)

    fireEvent.click(screen.getByText('Modelo'))

    const fiatButton = await screen.findByText('ONIX')
    fireEvent.click(fiatButton)

    expect(mockRouterReplace).toHaveBeenCalledWith(
      expect.stringContaining('?modelo=ONIX'),
      { scroll: false }
    )
  })

  it('should update search params when a filter is deselected', async () => {
    render(<FilterSelector />)

    fireEvent.click(screen.getByText('Modelo'))

    const fiatButton = await screen.findByText('ONIX')
    fireEvent.click(fiatButton)

    expect(mockRouterReplace).toHaveBeenCalledWith(
      expect.not.stringContaining('marca=ONIX'),
      { scroll: false }
    )
  })

  it('should show a loading skeleton while filters are loading', () => {
    (useFilters as jest.Mock).mockReturnValue({
      brands: [],
      models: [],
      versions: [],
      years: [],
      cities: [],
      loading: true,
    })

    render(<FilterSelector />)

    expect(screen.getByTestId('filter-selector-skeleton')).toBeInTheDocument()
  })
})
