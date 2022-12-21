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
