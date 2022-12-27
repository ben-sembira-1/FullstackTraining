import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Product } from '../interfaces/products'
import { ProductFilter, filterProducts } from '../utils/products'
import { TextInput, ToggleInput } from './Input'

type SearchBarProps = {
  allProducts: Product[]
  onFilteredProductsChange: (filteredProducts: Product[]) => void
}

export const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
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
      const filteredProducts = filterProducts(props.allProducts, [searchFilter, stockedFilter])
      props.onFilteredProductsChange(filteredProducts)
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
