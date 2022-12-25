import React, { FunctionComponent, ReactElement } from 'react'
import { Category, ProductsSet } from './interfaces/products'
import { ProductsCategoryTableSection } from './ProductsCategoryTableSection'
import { snakeCaseToCapitlizedHeader } from './utils/strings'

type ProductsTableProps = {
  categorizedProducts: Map<Category, ProductsSet>
}

type CategoryTableSectionProps = {
  category: Category
  productsSet: ProductsSet
}

const CategoryTableSection: FunctionComponent<CategoryTableSectionProps> = (props) => {
  const categoryName = Category[props.category]
  const categoryNiceHeader = snakeCaseToCapitlizedHeader(categoryName)
  return <ProductsCategoryTableSection
    key={props.productsSet.uuid}
    name={categoryNiceHeader}
    products={props.productsSet.products}
  />
}

type CategoryTableSectionListProps = {
  categorizedProducts: Map<Category, ProductsSet>
}

const CategoryTableSectionList: FunctionComponent<CategoryTableSectionListProps> = (props) => {
  const sections: ReactElement[] = []
  props.categorizedProducts.forEach(
    (productsSet, category) => sections.push(
      <CategoryTableSection category={category} productsSet={productsSet}/>
    )
  )
  return <>{sections}</>
}

export const ProductsTable: FunctionComponent<ProductsTableProps> = (props) =>
  (
    <div className="products_list">
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        <CategoryTableSectionList categorizedProducts={props.categorizedProducts}/>
      </table>
    </div>
  )
