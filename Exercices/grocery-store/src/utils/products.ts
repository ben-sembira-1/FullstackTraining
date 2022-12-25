import { v4 as uuidv4 } from 'uuid'
import { DBProductEntry } from '../interfaces/dbEntry'
import { Category, CategoryKey, Product, ProductsSet } from '../interfaces/products'
import { toUpperSnakeCase } from './strings'

export type ProductFilter = (p: Product) => boolean

export const reduceFilters = (products: Product[], filters: ProductFilter[]): Product[] => {
  console.log('Filtering products...')
  const passedAllFilters = (product: Product): boolean => {
    return filters.every(
      (currentFilter) => currentFilter(product)
    )
  }

  const filterdProducts = products.filter(
    (product) => passedAllFilters(product)
  )
  return filterdProducts
}

const newEmptyProductsSet = (): ProductsSet => ({ products: [], uuid: uuidv4() })

export const categorize = (products: Product[]): Map<Category, ProductsSet> => {
  console.log('categorizing products...')
  const categorizedProducts = new Map<Category, ProductsSet>()
  products.forEach(
    (product) => {
      if (!categorizedProducts.has(product.category)) {
        categorizedProducts.set(product.category, newEmptyProductsSet())
      }
      categorizedProducts.get(product.category)?.products.push(product)
    }
  )
  return categorizedProducts
}

const stringIsCategory = (s: string): s is CategoryKey => {
  const keysAndValues = Object.keys(Category)
  const keys = keysAndValues.filter((key) => isNaN(Number(key)))
  return keys.includes(s)
}

const InvalidCategory = Object.create(Error)

const stringToCategory = (s: string): Category => {
  const upperSnakeCaseString = toUpperSnakeCase(s)
  if (stringIsCategory(upperSnakeCaseString)) {
    return Category[upperSnakeCaseString]
  } else {
    throw InvalidCategory(`${s} is not a valid category`)
  }
}

export const productFactory = (dbEntry: DBProductEntry): Product => {
  return {
    ...dbEntry,
    category: stringToCategory(dbEntry.category),
    uuid: uuidv4()
  }
}
