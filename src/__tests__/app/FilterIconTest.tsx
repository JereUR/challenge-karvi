import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import FilterIcon from "@/components/FilterIcon"

jest.mock("./../../components/FilterSelector", () => ({
  FilterSelector: () => <div>Mocked FilterSelector</div>
}))

describe("FilterIcon Component", () => {
  it("should renders the 'Filtrar' button", () => {
    render(<FilterIcon />)

    const filterButton = screen.getByRole("button", { name: /filtrar/i })
    expect(filterButton).toBeInTheDocument()
    expect(filterButton).toHaveTextContent("Filtrar")
  })

  it("should opens the filter panel when clicking the 'Filtrar' button", () => {
    render(<FilterIcon />)

    const filterButton = screen.getByRole("button", { name: /filtrar/i })
    expect(screen.queryByTestId("filter-panel")).not.toBeInTheDocument()

    fireEvent.click(filterButton)

    const panel = screen.getByTestId("filter-panel")
    expect(panel).toBeInTheDocument()
  })

  it("should closes the filter panel when clicking the 'Cerrar filtros' button", () => {
    render(<FilterIcon />)

    const filterButton = screen.getByRole("button", { name: /filtrar/i })
    fireEvent.click(filterButton)

    const closeButton = screen.getByRole("button", { name: /Cerrar filtros/i })
    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    expect(screen.queryByTestId("filter-panel")).not.toBeInTheDocument()
  })

  it("should adds the correct classes for open and close animations", () => {
    render(<FilterIcon />)

    const panel = screen.getByTestId("filter-selector")
    expect(panel).toHaveClass("-translate-x-full")

    const filterButton = screen.getByRole("button", { name: /filtrar/i })
    fireEvent.click(filterButton)

    expect(panel).toHaveClass("translate-x-0")
    expect(panel).not.toHaveClass("-translate-x-full")
  })

})
