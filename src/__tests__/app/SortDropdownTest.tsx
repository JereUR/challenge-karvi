import { render, screen } from "@testing-library/react"

import { SortDropdown } from "@/components/SortDropdown"

describe("SortDropdown", () => {
  it("should render the current sort label", () => {
    const currentSort = 'price-asc'
    render(<SortDropdown currentSort={currentSort} onSortChange={() => { }} />)

    const button = screen.getByTestId('sortedBy')
    expect(button).toHaveTextContent('Precio: Más bajo primero')
  })

  it("should not show the dropdown options by default", () => {
    const currentSort = 'price-asc'
    render(<SortDropdown currentSort={currentSort} onSortChange={() => { }} />)

    const options = screen.queryAllByRole('menuitem')
    expect(options).toHaveLength(0)
  })
})
