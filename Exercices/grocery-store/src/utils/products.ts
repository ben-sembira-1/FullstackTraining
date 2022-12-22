import { v4 as uuidv4 } from 'uuid'
import { DBProductEntry } from '../interfaces/dbEntry'
import { Category, CategoryKey, CategorySet, Product } from '../interfaces/products'
import { toUpperSnakeCase } from './strings'

export type ProductFilter = (p: Product) => boolean

export function reduceFilters (products: Product[], filters: ProductFilter[]): Product[] {
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

  const newCategorySet = (category: Category): CategorySet => ({ category, products: [], uuid: uuidv4() })
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

function stringIsCategory (s: string): s is CategoryKey {
  const keys = Object.keys(Category).filter((key) => isNaN(Number(key)))
  return keys.includes(s)
}

const InvalidCategory = Object.create(Error)

function stringToCategory (s: string): Category {
  const upperSnakeCaseString = toUpperSnakeCase(s)
  if (stringIsCategory(upperSnakeCaseString)) {
    return Category[upperSnakeCaseString]
  } else {
    throw InvalidCategory(`${s} is not a valid category`)
  }
}

export function productFactory (dbEntry: DBProductEntry): Product {
  return {
    ...dbEntry,
    category: stringToCategory(dbEntry.category),
    uuid: uuidv4()
  }
}
