import React, { FunctionComponent, ReactElement } from 'react'
import { Category, ProductsSet } from './interfaces/products'
import { ProductsCategoryTableSection } from './ProductsCategoryTableSection'
import { snakeCaseToCapitlizedHeader } from './utils/strings'

type ProductsTableProps = {
  categorizedProducts: Map<Category, ProductsSet>
}

const createProductsCategoryTableSectionFromCategory = (category: Category, productsSet: ProductsSet): React.ReactElement => {
  const categoryName = Category[category]
  const categoryNiceHeader = snakeCaseToCapitlizedHeader(categoryName)
  return <ProductsCategoryTableSection
    key={productsSet.uuid}
    name={categoryNiceHeader}
    products={productsSet.products}
  />
}

const CreateProductsCategoryTableSectionList = (categorizedProducts: Map<Category, ProductsSet>): ReactElement[] => {
  const sections: ReactElement[] = []
  categorizedProducts.forEach(
    (productsSet, category) => sections.push(
      createProductsCategoryTableSectionFromCategory(category, productsSet)
    )
  )
  return sections
}

export const ProductsTable: FunctionComponent<ProductsTableProps> = (props) =>
  (
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
