import React, { FunctionComponent } from 'react'
import { FilterableProductTable } from './FilterableProductTable'
import { Category, Product } from './interfaces/products'

function fetchAllProducts (): Product[] {
  const products: Product[] = []
  for (let basePrice = 0; basePrice < 3; basePrice++) {
    [{ category: Category.FRUITS, priceDollars: 1, stocked: true, name: 'Apple' },
      { category: Category.FRUITS, priceDollars: 1, stocked: true, name: 'Dragonfruit' },
      { category: Category.FRUITS, priceDollars: 2, stocked: false, name: 'Passionfruit' },
      { category: Category.VEGETABLES, priceDollars: 2, stocked: true, name: 'Spinach' },
      { category: Category.VEGETABLES, priceDollars: 4, stocked: false, name: 'Pumpkin' },
      { category: Category.VEGETABLES, priceDollars: 1, stocked: true, name: 'Peas' }].forEach(
      (value) => {
        value.priceDollars = value.priceDollars + basePrice
        value.stocked = Math.random() > 0.3
        products.push(value)
      }
    )
    products.push()
  }
  return products
}

const App: FunctionComponent = () => {
  return (
    <FilterableProductTable products={fetchAllProducts()} />
  )
}

export default App
