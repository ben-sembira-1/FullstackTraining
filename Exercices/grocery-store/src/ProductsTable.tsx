import React, { FunctionComponent, ReactElement } from 'react'
import { Category, Product } from './interfaces/dbInterfaces'
import { ProductsCategoryTableSection } from './ProductsCategoryTableSection'
import { snakeCaseToCapitlizedHeader } from './utils/strings'

export interface CategorySet {
  category: Category
  products: Product[]
}

type CategorizedProducts = CategorySet[]

interface ProductsTableProps {
  categorizedProducts: CategorizedProducts
}

function CreateProductsCategoryTableSectionList (categorizedProducts: CategorizedProducts): ReactElement[] {
  return categorizedProducts.map(
    (category, index) => {
      const categoryName = Category[category.category]
      const categoryNiceHeader = snakeCaseToCapitlizedHeader(categoryName)
      return <ProductsCategoryTableSection
        key={index}
        name={categoryNiceHeader}
        products={category.products}
      />
    }
  )
}

export const ProductsTable: FunctionComponent<ProductsTableProps> = (props) => {
  return (
    <div className="products_list">
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {CreateProductsCategoryTableSectionList(props.categorizedProducts)}
      </table>
    </div>
  )
}
