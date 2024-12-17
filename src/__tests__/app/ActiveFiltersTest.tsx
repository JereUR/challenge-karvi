import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ActiveFilters } from '@/components/ActiveFilters'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

const mockPush = jest.fn()
const mockReplace = jest.fn()
const mockUseRouter = useRouter as jest.Mock
const mockUseSearchParams = useSearchParams as jest.Mock

const filters = [['marca', 'CHEVROLET'],
['modelo', 'ONIX'],]

const filters2 = [
  ['marca', 'CHEVROLET'],
  ['modelo', 'ONIX'],
  ['ano', '2023'],
]

describe('ActiveFilters Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    })
  })

  it('should renders nothing when there are no active filters', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams())

    const { container } = render(<ActiveFilters />)

    expect(container).toBeEmptyDOMElement()
  })


  it('should renders active filters correctly', () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams(filters)
    )

    render(<ActiveFilters />)

    expect(screen.getByText('CHEVROLET')).toBeInTheDocument()
    expect(screen.getByText('ONIX')).toBeInTheDocument()
    expect(screen.getByLabelText('Limpiar filtros')).toBeInTheDocument()
  })

  it('should removes a single filter when the close button is clicked', () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams(filters)
    )

    render(<ActiveFilters />)

    const removeButton = screen.getByTestId('delete ONIX')
    fireEvent.click(removeButton)

    expect(mockReplace).toHaveBeenCalledTimes(1)
    expect(mockReplace).toHaveBeenCalledWith(
      `${window.location.pathname}?marca=CHEVROLET`,
      { scroll: false }
    )
  })

  it('should removes all filters when "Limpiar Filtros" is clicked', () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams(filters)
    )

    render(<ActiveFilters />)

    const clearButton = screen.getByText('Limpiar Filtros')
    fireEvent.click(clearButton)

    expect(mockReplace).toHaveBeenCalledTimes(1)
    expect(mockReplace).toHaveBeenCalledWith(`${window.location.pathname}`, {
      scroll: false,
    })
  })

  it('should renders multiple filters and removes only the selected filter', () => {
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams(filters2)
    )

    render(<ActiveFilters />)

    const toyotaFilter = screen.getByText('CHEVROLET')
    const removeButtons = screen.getAllByLabelText('Eliminar filtro')

    fireEvent.click(removeButtons[0])

    expect(mockReplace).toHaveBeenCalledWith(
      `${window.location.pathname}?modelo=ONIX&ano=2023`,
      { scroll: false }
    )
    expect(toyotaFilter).toBeInTheDocument()
  })
})
