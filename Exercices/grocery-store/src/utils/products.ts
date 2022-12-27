import { v4 as uuidv4 } from 'uuid'
import { DBProductEntry } from '../interfaces/dbEntry'
import { Category, CategoryKey, Product, ProductsSet } from '../interfaces/products'
import { toUpperSnakeCase } from './strings'

export type ProductFilter = (p: Product) => boolean

export const filterProducts = (products: Product[], filters: ProductFilter[]): Product[] => {
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
      let productSet = categorizedProducts.get(product.category)
      if (productSet === undefined) {
        productSet = newEmptyProductsSet()
        categorizedProducts.set(product.category, productSet)
      }
      productSet.products.push(product)
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

export const createProductFromDBEntry = (dbEntry: DBProductEntry): Product => {
  return {
    ...dbEntry,
    category: stringToCategory(dbEntry.category),
    uuid: uuidv4()
  }
}
