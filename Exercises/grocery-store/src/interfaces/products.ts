import { DBProductEntry } from './dbEntry'

export enum Category {
  FRUITS,
  VEGETABLES
}

export type CategoryKey = keyof typeof Category

export type Product = {
  category: Category
  uuid: string
} & Omit<DBProductEntry, 'category'>

export type ProductsSet = {
  products: Product[]
  uuid: string
}
