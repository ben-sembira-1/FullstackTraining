import { DBProductEntry } from './dbEntry'

export enum Category {
  FRUITS,
  VEGETABLES
}

export interface Product extends Omit<DBProductEntry, 'category'> {
  category: Category
  uuid: string
}

export interface CategorySet {
  category: Category
  products: Product[]
}

export type CategorizedProducts = CategorySet[]
