import React, { FunctionComponent, useCallback, useState } from 'react'
import { SearchBar } from './search-section/SearchBar'
import { TextInput, ToggleInput } from './search-section/Input'
import { ProductsTable } from './ProductsTable'
import { Product } from './interfaces/products'
import { categorize, ProductFilter, reduceFilters } from './utils/products'

interface FilterableProductTableProps {
  products: Product[]
}

export const FilterableProductTable: FunctionComponent<FilterableProductTableProps> = ({ products }) => {
  const [searchValue, setSearchValue] = useState('')
  const [onlyStocked, setOnlyStocked] = useState(false)

  const searchFilter: ProductFilter = useCallback(
    (product) => product.name.toLowerCase().includes(searchValue.toLowerCase()),
    [searchValue]
  )
  const stockedFilter: ProductFilter = useCallback(
    (product) => !onlyStocked || product.stocked,
    [onlyStocked]
  )

  const filterdProducts = reduceFilters(products, [searchFilter, stockedFilter])
  const categorizedData = categorize(filterdProducts)

  return (
        <>
            <SearchBar>
                <TextInput
                    placeholder="Search..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                />
                <ToggleInput
                    label="Only show products in stock"
                    checked={onlyStocked}
                    onCheckedChange={setOnlyStocked}
                />
            </SearchBar>
            <ProductsTable categorizedProducts={categorizedData} />
        </>
  )
}
