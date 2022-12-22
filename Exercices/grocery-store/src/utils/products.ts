import { Category, CategorySet, Product } from '../interfaces/products'

export type Filter = (p: Product) => boolean

export function reduceFilters (products: Product[], filters: Filter[]): Product[] {
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

export const sortProductsByCategory = (products: Product[]): Product[] => {
  return [...products].sort(
    (product1: Product, product2: Product): number => product1.category - product2.category
  )
}

export function categorize (products: Product[]): CategorySet[] {
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
