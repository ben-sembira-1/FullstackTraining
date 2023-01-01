import React, { FunctionComponent, useState } from 'react'
import { SearchBar } from './search-section/SearchBar'
import { ProductsTable } from './ProductsTable'
import { Product } from './interfaces/products'
import { categorize } from './utils/products'

type FilterableProductTableProps = {
  products: Product[]
}

export const FilterableProductTable: FunctionComponent<FilterableProductTableProps> = ({ products }) => {
  const [searchBarFilterdProducts, setSearchBarFilterdProducts] = useState<Product[]>([])
  return (
    <>
      <SearchBar
        allProducts={products}
        onFilteredProductsChange={setSearchBarFilterdProducts}
      />
      <ProductsTable categorizedProducts={categorize(searchBarFilterdProducts)} />
    </>
  )
}
