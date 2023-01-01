import React from 'react'
import { FilterableProductTable } from './FilterableProductTable'
import { DBProductEntry } from './interfaces/dbEntry'
import { createProductFromDBEntry } from './utils/products'

const fetchDB = () => {
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

const getProductsFromDB = () => {
  const dbData = fetchDB()
  return dbData.map((dpEntry) => createProductFromDBEntry(dpEntry))
}

const App = () => <FilterableProductTable products={getProductsFromDB()} />

export default App
