import React, { FunctionComponent, useCallback, useState } from 'react'
import { SearchBar } from './search-section/SearchBar'
import { ProductsTable } from './ProductsTable'
import { Product } from './interfaces/products'
import { categorize, ProductFilter, reduceFilters } from './utils/products'

type FilterableProductTableProps = {
  products: Product[]
}

export const FilterableProductTable: FunctionComponent<FilterableProductTableProps> = ({ products }) => {
  const [searchValue, setSearchValue] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)

  const searchFilter: ProductFilter = useCallback(
    (product) => product.name.toLowerCase().includes(searchValue.toLowerCase()),
    [searchValue]
  )
  const stockedFilter: ProductFilter = useCallback(
    (product) => !onlyInStock || product.stocked,
    [onlyInStock]
  )

  const filterdProducts = reduceFilters(products, [searchFilter, stockedFilter])
  const categorizedData = categorize(filterdProducts)

  return (
    <>
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        onlyInStock={onlyInStock}
        onOnlyInStockChange={setOnlyInStock}
      />
      <ProductsTable categorizedProducts={categorizedData} />
    </>
  )
}
