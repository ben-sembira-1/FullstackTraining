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

export type CategorySet = {
  category: Category
  products: Product[]
  uuid: string
}

export type CategorizedProducts = CategorySet[]
