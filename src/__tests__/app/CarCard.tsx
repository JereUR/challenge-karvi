import { render, screen } from '@testing-library/react'

import { CarGridItem } from '@/components/CarGridItem'


const carMock = {
  "id": 1,
  "city": "São Paulo",
  "year": 2024,
  "brand": "CHEVROLET",
  "model": "ONIX",
  "version": "1.0 LT MANUAL",
  "price": 85000,
  "mileage": 5000
}

describe('Car card', () => {
  const setup = () => render(<CarGridItem car={carMock} />)

  beforeEach(() => {
  })

  it('should renders home Car Card button', () => {
    setup()
    expect(screen.getByText('Simular parcelas')).toBeInTheDocument()
  })
})
