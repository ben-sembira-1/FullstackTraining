import React, { FunctionComponent, ReactElement } from 'react'
import { CategorizedProducts, Category, CategorySet } from './interfaces/products'
import { ProductsCategoryTableSection } from './ProductsCategoryTableSection'
import { snakeCaseToCapitlizedHeader } from './utils/strings'

type ProductsTableProps = {
  categorizedProducts: CategorizedProducts
}

const createProductsCategoryTableSectionFromCategory = (category: CategorySet): React.ReactElement => {
  const categoryName = Category[category.category]
  const categoryNiceHeader = snakeCaseToCapitlizedHeader(categoryName)
  return <ProductsCategoryTableSection
    key={category.uuid}
    name={categoryNiceHeader}
    products={category.products}
  />
}

const CreateProductsCategoryTableSectionList = (categorizedProducts: CategorizedProducts): ReactElement[] =>
  categorizedProducts.map(
    (category) => createProductsCategoryTableSectionFromCategory(category)
  )

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
