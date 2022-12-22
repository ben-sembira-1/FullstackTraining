export enum Category {
  FRUITS,
  VEGETABLES
}

export interface Product {
  category: Category
  priceDollars: number
  stocked: boolean
  name: string
}

export interface CategorySet {
  category: Category
  products: Product[]
}

export type CategorizedProducts = CategorySet[]
