import React, { FunctionComponent } from 'react'
import { Category, Product } from './interfaces/dbInterfaces'
import { ProductsCategoryTableSection } from './ProductsCategoryTableSection'

export interface CategorySet {
  category: Category
  products: Product[]
}

interface ProductsTableProps {
  products: CategorySet[]
}

export const ProductsTable: FunctionComponent<ProductsTableProps> = (props) => {
  const capitalizeFirstLetter = (s: string): string => s.length > 0 ? s[0].toUpperCase() + s.substring(1) : s
  const categoryToHeader = (category: Category): string => category.toString().toLowerCase().split('_').map(capitalizeFirstLetter).join(' ')
  return (
        <div className="products_list">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                {
                    props.products.map(
                      (category, index) => <ProductsCategoryTableSection key={index} name={categoryToHeader(category.category)} products={category.products} />
                    )
                }
            </table>
        </div>
  )
}
