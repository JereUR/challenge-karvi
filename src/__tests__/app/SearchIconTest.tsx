import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import SearchIcon from "@/components/SearchIcon"

const mockUseSearchLogic = jest.fn()

jest.mock("./../../hooks/useSearchLogic", () => ({
  useSearchLogic: () => mockUseSearchLogic(),
}))

describe("SearchIcon Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render the search button initially", () => {
    mockUseSearchLogic.mockReturnValue({
      isExpanded: false,
      searchTerm: "",
      inputRef: { current: null },
      exitButtonRef: { current: null },
      setSearchTerm: jest.fn(),
      handleToggle: jest.fn(),
      handleKeyDown: jest.fn(),
      handleExit: jest.fn(),
    })

    render(<SearchIcon />)

    const searchButton = screen.getByRole("button", { name: /buscar/i })
    expect(searchButton).toBeInTheDocument()
    expect(searchButton).toHaveTextContent("Buscar")
  })

  it("should hide the search button when expanded and show the input", () => {
    mockUseSearchLogic.mockReturnValue({
      isExpanded: true,
      searchTerm: "",
      inputRef: { current: null },
      exitButtonRef: { current: null },
      setSearchTerm: jest.fn(),
      handleToggle: jest.fn(),
      handleKeyDown: jest.fn(),
      handleExit: jest.fn(),
    })

    render(<SearchIcon />)

    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /buscar/i })).toHaveClass("hidden")
  })

  it("should update the search input value", () => {
    const setSearchTermMock = jest.fn()

    mockUseSearchLogic.mockReturnValue({
      isExpanded: true,
      searchTerm: "",
      inputRef: { current: null },
      exitButtonRef: { current: null },
      setSearchTerm: setSearchTermMock,
      handleToggle: jest.fn(),
      handleKeyDown: jest.fn(),
      handleExit: jest.fn(),
    })

    render(<SearchIcon />)

    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "CHEVROLET" } })

    expect(setSearchTermMock).toHaveBeenCalledWith("CHEVROLET")
  })

  it("should call handleToggle when clicking the search button", () => {
    const handleToggleMock = jest.fn()

    mockUseSearchLogic.mockReturnValue({
      isExpanded: false,
      searchTerm: "",
      inputRef: { current: null },
      exitButtonRef: { current: null },
      setSearchTerm: jest.fn(),
      handleToggle: handleToggleMock,
      handleKeyDown: jest.fn(),
      handleExit: jest.fn(),
    })

    render(<SearchIcon />)

    const searchButton = screen.getByRole("button", { name: /buscar/i })
    fireEvent.click(searchButton)

    expect(handleToggleMock).toHaveBeenCalled()
  })

  it("should call handleExit when clicking the close button", () => {
    const handleExitMock = jest.fn()

    mockUseSearchLogic.mockReturnValue({
      isExpanded: true,
      searchTerm: "test",
      inputRef: { current: null },
      exitButtonRef: { current: null },
      setSearchTerm: jest.fn(),
      handleToggle: jest.fn(),
      handleKeyDown: jest.fn(),
      handleExit: handleExitMock,
    })

    render(<SearchIcon />)

    const closeButton = screen.getByRole("button", { name: /cerrar buscador/i })
    fireEvent.click(closeButton)

    expect(handleExitMock).toHaveBeenCalled()
  })
})
