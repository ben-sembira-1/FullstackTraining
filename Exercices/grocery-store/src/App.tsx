import React, { FunctionComponent } from 'react'
import { FilterableProductTable } from './FilterableProductTable'
import { DBProductEntry } from './interfaces/dbEntry'
import { Product } from './interfaces/products'
import { productFactory } from './utils/products'

function fetchDB (): DBProductEntry[] {
  const products: DBProductEntry[] = []
  for (let basePrice = 0; basePrice < 3; basePrice++) {
    [{ category: 'FRUITS', priceDollars: 1, stocked: true, name: 'Apple' },
      { category: 'FRUITS', priceDollars: 1, stocked: true, name: 'Dragonfruit' },
      { category: 'FRUITS', priceDollars: 2, stocked: false, name: 'Passionfruit' },
      { category: 'VEGETABLES', priceDollars: 2, stocked: true, name: 'Spinach' },
      { category: 'VEGETABLES', priceDollars: 4, stocked: false, name: 'Pumpkin' },
      { category: 'VEGETABLES', priceDollars: 1, stocked: true, name: 'Peas' }].forEach(
      (value) => {
        value.priceDollars = value.priceDollars + basePrice
        value.stocked = Math.random() > 0.3
        products.push(value)
      }
    )
  }
  return products
}

function getProductsFromDB (): Product[] {
  const dbData = fetchDB()
  return dbData.map((dpProductEntry) => productFactory(dpProductEntry))
}

const App: FunctionComponent = () => {
  return (
    <FilterableProductTable products={getProductsFromDB()} />
  )
}

export default App
