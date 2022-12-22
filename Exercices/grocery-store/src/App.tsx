import React, { FunctionComponent } from 'react'
import { FilterableProductTable } from './FilterableProductTable'
import { Product } from './interfaces/products'
import { productFactory } from './utils/products'

function fetchAllProducts (): Product[] {
  const products: Product[] = []
  for (let basePrice = 0; basePrice < 3; basePrice++) {
    [{ category: 'FRUITS', priceDollars: 1, stocked: true, name: 'Apple' },
      { category: 'FRUITS', priceDollars: 1, stocked: true, name: 'Dragonfruit' },
      { category: 'FRUITS', priceDollars: 2, stocked: false, name: 'Passionfruit' },
      { category: 'VEGETABLES', priceDollars: 2, stocked: true, name: 'Spinach' },
      { category: 'VEGETABLES', priceDollars: 4, stocked: false, name: 'Pumpkin' },
      { category: 'VEGETABLES', priceDollars: 1, stocked: true, name: 'Peas' }].forEach(
      (value) => {
        const currentProduct = productFactory(value)
        currentProduct.priceDollars = value.priceDollars + basePrice
        currentProduct.stocked = Math.random() > 0.3
        products.push(currentProduct)
      }
    )
  }
  return products
}

const App: FunctionComponent = () => {
  return (
    <FilterableProductTable products={fetchAllProducts()} />
  )
}

export default App
