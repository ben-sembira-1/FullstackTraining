import { ProductsCategoryTableSection } from "./ProductsCategoryTableSection";

export function ProductsTable({ products }) {
    return (
        <div className="products_list">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                {
                    products.map(
                        (category, index) => <ProductsCategoryTableSection key={index} name={category.name} products={category.products} />
                    )
                }
            </table>
        </div>
    );
}