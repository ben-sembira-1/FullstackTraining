import React, { FunctionComponent } from 'react'
import { Product } from './interfaces/products'
import { ProductTableRow } from './ProductTableRow'

type ProductsCategoryTableSectionProps = {
  name: string
  products: Product[]
}

export const ProductsCategoryTableSection: FunctionComponent<ProductsCategoryTableSectionProps> = (props) => {
  return (
    <>
      <tr>
        <th className="products_table_full_row" colSpan={2}>{props.name}</th>
      </tr>
      {
        props.products.map(
          (product, index) => <ProductTableRow key={product.uuid} product={product} />
        )
      }
    </>
  )
}
