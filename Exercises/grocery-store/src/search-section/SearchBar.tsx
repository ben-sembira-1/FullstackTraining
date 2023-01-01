import React, { FC, useCallback, useEffect, useState } from 'react'
import { Product } from '../interfaces/products'
import { ProductFilter, combineFilters } from '../utils/products'
import { TextInput, ToggleInput } from './Input'

type SearchBarProps = {
  allProducts: Product[]
  onFilteredProductsChange: (filteredProducts: Product[]) => void
}

export const SearchBar: FC<SearchBarProps> = (props) => {
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

  useEffect(
    () => {
      console.log('filtering products...')
      const combinedFilter = combineFilters([searchFilter, stockedFilter])
      props.onFilteredProductsChange(props.allProducts.filter(combinedFilter))
    },
    [searchFilter, stockedFilter]
  )

  return (
    <div>
      <TextInput
        placeholder="Search..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <ToggleInput
        label="Only show products in stock"
        checked={onlyInStock}
        onCheckedChange={setOnlyInStock}
      />
    </div>
  )
}
