import { render, screen } from '@testing-library/react'

import { CarGridItem } from '@/components/CarGridItem'

describe('Car card', () => {
  it('renders home Car Card', () => {

    render(<CarGridItem car={{
      "id": 1,
      "city": "São Paulo",
      "year": 2024,
      "brand": "CHEVROLET",
      "model": "ONIX",
      "version": "1.0 LT MANUAL",
      "price": 85000,
      "mileage": 5000
    }} />)

    expect(screen.getByText('Simular parcelas')).toBeInTheDocument()
  })
})
