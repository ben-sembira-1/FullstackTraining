import React, { FunctionComponent } from 'react'
import { Product } from './interfaces/products'

type ProductTableRowProps = {
  product: Product
}

export const ProductTableRow: FunctionComponent<ProductTableRowProps> = (props) =>
  (
    <tr className={props.product.stocked ? 'product_row--in_stock' : 'product_row--out_of_stock'}>
      <td>{props.product.name}</td>
      <td>{'$' + props.product.priceDollars.toString()}</td>
    </tr>
  )
