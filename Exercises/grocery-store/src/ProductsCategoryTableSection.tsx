import React, { FC } from 'react'
import { Product } from './interfaces/products'
import { ProductTableRow } from './ProductTableRow'

type ProductsCategoryTableSectionProps = {
  name: string
  products: Product[]
}

export const ProductsCategoryTableSection: FC<ProductsCategoryTableSectionProps> = (props) => {
  return (
    <>
      <tr>
        <th className="products_table_full_row" colSpan={2}>{props.name}</th>
      </tr>
      {
        props.products.map(
          (product) => <ProductTableRow key={product.uuid} product={product} />
        )
      }
    </>
  )
}
