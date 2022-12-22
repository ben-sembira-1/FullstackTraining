import React, { FunctionComponent, useCallback, useState } from 'react'
import { SearchBar } from './search-section/SearchBar'
import { TextInput, ToggleInput } from './search-section/Input'
import { CategorySet, ProductsTable } from './ProductsTable'
import { Category, Product } from './interfaces/dbInterfaces'

type Filter = (p: Product) => boolean

function reduceFilters (products: Product[], filters: Filter[]): Product[] {
  console.log('Filtering products...')
  function passedAllFilters (product: Product): boolean {
    return filters.every(
      (currentFilter) => currentFilter(product)
    )
  }

  const filterdProducts = [...products].filter(
    (product) => passedAllFilters(product)
  )
  return filterdProducts
}

const sortProductsByCategory = (products: Product[]): Product[] => {
  return [...products].sort(
    (product1: Product, product2: Product): number => product1.category - product2.category
  )
}

function categorize (products: Product[]): CategorySet[] {
  console.log('categorizing products...')

  const newCategorySet = (category: Category): CategorySet => ({ category, products: [] })
  const sortedProducts = sortProductsByCategory(products)

  const categorizedProducts: CategorySet[] = []
  let currentCategorySet: CategorySet

  const firstIteration = (): boolean => currentCategorySet === undefined
  sortedProducts.forEach(
    (product) => {
      if (firstIteration() || product.category !== currentCategorySet.category) {
        currentCategorySet = newCategorySet(product.category)
        categorizedProducts.push(currentCategorySet)
      }

      currentCategorySet.products.push(product)
    }
  )
  return categorizedProducts
}

interface FilterableProductTableProps {
  products: Product[]
}

export const FilterableProductTable: FunctionComponent<FilterableProductTableProps> = ({ products }) => {
  const [searchValue, setSearchValue] = useState('')
  const [onlyStocked, setOnlyStocked] = useState(false)

  const searchFilter: Filter = useCallback(
    (product) => product.name.includes(searchValue),
    [searchValue]
  )
  const stockedFilter: Filter = useCallback(
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
