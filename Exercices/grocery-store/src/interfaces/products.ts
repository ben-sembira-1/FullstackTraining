import { DBProductEntry } from './dbEntry'

export enum Category {
  FRUITS,
  VEGETABLES
}

export type CategoryKey = keyof typeof Category

export interface Product extends Omit<DBProductEntry, 'category'> {
  category: Category
  uuid: string
}

export interface CategorySet {
  category: Category
  products: Product[]
  uuid: string
}

export type CategorizedProducts = CategorySet[]
